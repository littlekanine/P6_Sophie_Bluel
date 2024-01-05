// Variable
import { works } from "./script.js"
import { storedToken } from "./script.js";

const modalWrap = document.getElementById("modal-wrap")

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click' , openModale);

const target = document.getElementById('modal1');
target.addEventListener('click', closeModal);

const worksWrap = document.querySelector(".works-wrap")

const titleWrap = document.getElementById("title-wrap")

const addWorks = document.getElementById("add-works");
addWorks.addEventListener("click" , openModaleAddWorks);

const valid = document.getElementById("valid")

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

// Delete work

async function deleteWork(workId) {
    const token = storedToken
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`},
        
    });
    // if (!works.includes(workId)) {
    //     console.log(`L'élément avec l'ID ${workId} n'existe pas.`);
    //     return;
    // }

    console.log(response)
    try {
        switch(response.status) {
            case 200:
                console.log('ID récupéré :', workId);
                works.removeItem(workId);
                generateGalleryWrap(works)
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

// suppression : pas recall Api/ pas de refresh 
//event.listener sur les trash buttons pour chaque work dans la gallery 
// dans l'event je recup l'id --> call API delete // verif du call API /le retrouver a partir de l'id
//enleve le work de la global avec javascript ("remove item")
//si bien supprimer je regenere les gallery 

// ajout : same same but different 
// crea variable new work , que j'ajoute a mon tableau de works et regenerate gallery 