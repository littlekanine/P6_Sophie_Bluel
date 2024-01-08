// Variable
import { works } from "./script.js"
import { newWorks } from "./script.js";
import { storedToken } from "./script.js";

let regex = RegExp ("a-z0-9._-")

const modalWrap = document.getElementById("modal-wrap")

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click' , openModale);

const target = document.getElementById('modal1');
target.addEventListener('click', closeModal);

const worksWrap = document.querySelector(".works-wrap")

const titleWrap = document.getElementById("title-wrap")

const addWorks = document.getElementById("add-works");
addWorks.addEventListener("click" , openModaleAddWorks);

const arrowReturn = document.querySelector(".arrow")

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
    if(modal === null) return;
    if (!modalWrap.contains(e.target)) {
        target.classList.add("invisible");
        modal = null;
    }
}

// generate Gallery Wrap

function generateGalleryWrap(works) {

    works.forEach(work => {

        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const trashWrap = document.createElement("button")
        const trashIcon = document.createElement("i")

        workElement.appendChild(imageElement)
        workElement.appendChild(trashWrap)
        trashWrap.appendChild(trashIcon)

        trashWrap.classList.add("trash-wrap")
        trashIcon.classList.add("trash-icone")
        imageElement.src = work.imageUrl;
        
        worksWrap.appendChild(workElement)

        const workId = work.id
        trashWrap.addEventListener("click" , function(e) {
            e.preventDefault();   
            console.log(workId)

            deleteWork(workId)
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
        
        arrowReturn.addEventListener("click", function(e) {
            e.preventDefault();
            const pictureModal = document.querySelector(".div-picture");
            pictureModal.classList.add("invisible")
            galleryModal.classList.remove("invisible")
        });
}

//addWorks

const addPicture = document.getElementById("add-picture")
const picture = document.getElementById("picture")
const pictureIcon =document.getElementById("picture-icone")

function createPictureForm() {
    event.preventDefault();
    pictureIcon.classList.add("invisible");
    const inputPicture = document.createElement("input");

    picture.appendChild(inputPicture);
        inputPicture.type = "file";
        inputPicture.accept = "image/*";

        inputPicture.addEventListener("change", function() {
            const selectedFile = inputPicture.files[0];
        });

        if (selectedFile) {
            console.log("Fichier sélectionné :", selectedFile.name);
        }
    addPicture.removeEventListener("click", createPictureForm);
}

addPicture.addEventListener("click", createPictureForm)

const inputAddWorks = document.querySelector(".input-img")
let resultat = regex.test(inputAddWorks.value)

const valid = document.getElementById("valid")
valid.addEventListener("click", function() {
    addWork(work)
})

async function addWork (work) {
    if (resultat) {
        const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(work),
        })
        .then((response) => {
            switch(response.status) {
                case 201:
                    generateGalleryWrap(works);
                break;
                case 400: 
                    console.log("Bad Request");
                break;
                case 401:
                console.log("Unauthorized")
                break;
            }
        })
    } else {
        console.log("probleme")
    }
}

// Delete work

async function deleteWork(workId) {
    // event.preventDefault();

    const token = storedToken;
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`},
    });
    console.log(response)
    try {
        switch(response.status) {
            case 200:
                // event.preventDefault()
                console.log('ID récupéré :', workId);
                // works.removeItem(workId);
                // generateGalleryWrap(works)
                break;
            case 401 : 
                console.log("Unauthorized")
                break;
            default:
                throw new Error(`error : ${response.status}`);
        }            
    } catch (error) {
            throw new Error(`error : ${error.message}`);
    };
}

// ajout : same same but different 
// crea variable new work , que j'ajoute a mon tableau de works et regenerate gallery 