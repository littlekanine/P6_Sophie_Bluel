// Variable
import { works } from "./script.js"
// import { newWorks } from "./script.js";
import { storedToken } from "./script.js";

localStorage.setItem('works', JSON.stringify(works));

const token = storedToken;

const categoryOptions = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

let regex = RegExp ("a-z0-9._-")

const modalWrap = document.getElementById("modal-wrap")

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click' , openModale);

const target = document.getElementById('modal1');

const worksWrap = document.querySelector(".works-wrap")

const addWorks = document.getElementById("add-works");
addWorks.addEventListener("click" , openModaleAddWorks);

const arrowReturn = document.querySelector(".arrow")

let currentWorkId;
// Function open/close modale

let modal = null

//open first modal

function openModale(e) {
    e.preventDefault();
    if (modal === null) {
        modal = target;

        target.classList.remove("invisible");
        target.classList.add("flex")
    }
    generateGalleryWrap(works)
}

function closeModal(e) {
    e.preventDefault();
    if (modal !== null) {
        target.classList.remove("flex");
        target.classList.add("invisible");
        modal = null;
    }
}

const xMark = document.querySelector(".xmark")
xMark.addEventListener("click", closeModal)

// generate Gallery Wrap

function generateGalleryWrap(works) {

    worksWrap.innerHTML = "";

    works.forEach(work => {

        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const trashWrap = document.createElement("button");
        trashWrap.type = "button";
        const trashIcon = document.createElement("i");

        workElement.appendChild(imageElement);
        workElement.appendChild(trashWrap);
        trashWrap.appendChild(trashIcon);

        trashWrap.classList.add("trash-wrap");
        trashIcon.classList.add("trash-icone");
        imageElement.src = work.imageUrl;
        
        worksWrap.appendChild(workElement);
        localStorage.setItem('works', JSON.stringify(work));
        console.log(localStorage)

        trashWrap.addEventListener("click", async function(e) {
            e.preventDefault();
            currentWorkId = work.id !== undefined ? work.id : null;
            await deleteWork(currentWorkId);
            console.log("cliqué");
            localStorage.removeItem(work.currentWorkId)
            console.log(localStorage)
        });
    });    
}

// switch to modal addWorks

function openModaleAddWorks(e) {
    e.preventDefault();
    const galleryModal = document.querySelector(".gallery-modal")
    galleryModal.classList.add("invisible")
    const addImg = document.querySelector(".div-picture")
    addImg.classList.remove("invisible")
    addImg.classList.add("flex")
    arrowReturn.classList.remove("hidden")
    localStorage.setItem('modalClosed', 'true');
    
    arrowReturn.addEventListener("click", function(e) {
        e.preventDefault();
        const pictureModal = document.querySelector(".div-picture");
        pictureModal.classList.add("invisible")
        galleryModal.classList.remove("invisible")
        arrowReturn.classList.add("hidden")
    });
}

//addWorks

const elements = {
    buttonAddPicture: document.getElementById("button-add-picture"),
    inputSelectPicture: document.getElementById("input-select-picture"),
    addPicture: document.getElementById("add-picture"),
    pictureIcon: document.getElementById("picture-icone"),
    custombutton: document.getElementById("customButton"),
    dropArea: document.getElementById("dropArea"),
    previewImage: document.getElementById("previewImage"),
    titleInput: document.getElementById("title-new-work"),
    categoryInput: document.getElementById("category"),
    valid: document.getElementById("valid"),
    errorNewWork: document.getElementById("error-new-work"),
};

async function handleFile(file, imageUrl) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            localStorage.setItem('image', reader.result);
            previewImage.src = reader.result;
            resolve(reader.result);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

async function createPictureForm(event) {
    event.preventDefault();
    elements.pictureIcon.classList.add("invisible");
    elements.buttonAddPicture.classList.add("invisible");
    elements.inputSelectPicture.classList.remove("invisible");
    elements.dropArea.classList.remove("invisible");

    elements.dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        elements.dropArea.classList.remove("invisible");
    });

    elements.dropArea.addEventListener('drop', async function (event) {
        event.preventDefault();
        elements.dropArea.classList.add("invisible");

        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            elements.imageUrl = await handleFile(file);
            handleFile(file, elements.imageUrl);
            elements.custombutton.classList.add("invisible")
            console.log("Changement détecté (via glisser-déposer)");
        } else {
            console.log("Le fichier n'est pas une image.");
        }
    });
}

elements.addPicture.addEventListener("click", createPictureForm);

elements.valid.addEventListener("click", function(event) {
    event.preventDefault();
    const form = document.getElementById("my-form-new-work");

    if (titleInput.value && categoryInput.value !== categoryOptions) {
        addNewWorks();
    }
});

async function addNewWorks(newWork) {
    const picture = imageUrl;
    const title = titleInput.value;
    const category = categoryInput.value;
    console.log(picture);

    newWork = {
        id: newWorks.length + 1,
        title: title,
        imageUrl: picture,
        categoryId: category,
        userId: 0, 
    };
    newWorks.push(newWork);
    console.log(newWorks);
}

async function addWork (work) {
        const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(work),
        })
        .then((response) => {
            switch(response.status) {
                case 201:
                    // generateGalleryWrap(works);
                break;
                case 400: 
                    console.log("Bad Request");
                break;
                case 401:
                console.log("Unauthorized")
                break;
        }
    })
}

// Delete work

async function deleteWork(currentWorkId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${currentWorkId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        switch(response.status) {
            case 204:
                console.log(localStorage)
                break;
            case 401 : 
                console.log("Unauthorized")
                break;
            default:
                throw new Error(`error : ${response.status}`);
        }   
    } catch {
        console.error('Erreur lors de la suppression du travail:', error);
    }
}
// ajout : same same but different 
// crea variable new work , que j'ajoute a mon tableau de works et regenerate gallery 

// suppression : pas recall Api/ pas de refresh
//event.listener sur les trash buttons pour chaque work dans la gallery 
// dans l'event je recup l'id --> call API delete // verif du call API /le retrouver a partir de l'id