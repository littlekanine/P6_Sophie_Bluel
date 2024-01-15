// Variable
import { categoriesData, works, generateGallery, storedToken } from "./script.js"

localStorage.setItem('works', JSON.stringify(works));

const token = storedToken;

const categoryOptions = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

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

// var storageData = localStorage.getItem('works');
// console.log(storageData)

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

        trashWrap.addEventListener("click", async function(e) {
            e.preventDefault();
            currentWorkId = work.id
            works = works.filter(work => work.id !== currentWorkId);
            generateGalleryWrap(works)
            generateGallery(works)
            console.log("ID de l'élément à supprimer :", currentWorkId);
            await deleteWork(currentWorkId)
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

const buttonAddPicture = document.getElementById("button-add-picture");
const inputSelectPicture = document.getElementById("input-select-picture");
const addPicture = document.getElementById("add-picture");
const pictureIcon = document.getElementById("picture-icone");
const custombutton = document.getElementById("customButton");
const valid = document.getElementById("valid");
const errorNewWork = document.getElementById("error-new-work");

const selectedImage = document.getElementById("selected-image");
let  selecteCategories = document.getElementById("categoryOptions")

addPicture.addEventListener("change", function () {
    const selectedFile = addPicture.files[0];
        if (selectedFile) {
            selectedImage.src = URL.createObjectURL(selectedFile)
            buttonAddPicture.classList.add("invisible");
            console.log(selectedImage);
        }
});
const imageUrl = selectedImage;

valid.addEventListener("click" ,  function (e) {
    e.preventDefault()
    const titleInput = document.getElementById("title-new-work").value;
    const categoryInput = document.getElementById("category").value;
    const selectedCategoryObject = categoriesData.find(category => category.name === categoryInput);
     if (titleInput === "" || categoryInput === "" ) {
        errorNewWork.classList.remove("invisible")
     } else {
        errorNewWork.classList.add("invisible")
        console.log(titleInput, categoryInput );
     }
     return
})


async function addNewWorks(newWork) {
    console.log(picture);

    newWork = {
        id: newWorks.length + 1,
        title: title,
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
                console.log("Supprimé");
                break;
            case 401 : 
                console.log("Unauthorized")
                break;
            default:
                throw new Error(`error : ${response.status}`);
        }   
    } catch {
        console.error('Erreur lors de la suppression du travail:');
    }
}
// ajout : same same but different 
// crea variable new work , que j'ajoute a mon tableau de works et regenerate gallery 

// suppression : pas recall Api/ pas de refresh 
//event.listener sur les trash buttons pour chaque work dans la gallery 
// dans l'event je recup l'id --> call API delete // verif du call API /le retrouver a partir de l'id
//enleve le work de la global avec javascript ("remove item")
//si bien supprimer je regenere les gallery 