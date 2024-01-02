// Variable

import { works } from "./script.js"

const modalWrap = document.getElementById("modal-wrap")

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click', openModale);

const target = document.getElementById('modal1');
target.addEventListener('click', closeModal);

// Function open/close modale

let modal = null

function openModale(e) {
    e.preventDefault();
    console.log(works)
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

function generateGalleryWrap(data) {
    const worksWrap = document.querySelector(".works-wrap")
    // worksWrap.innerHTML=""

    data.forEach(work => {

        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const trashWrap = document.createElement("div")
        const trashIcon = document.createElement("div")
        workElement.appendChild(imageElement)
        workElement.appendChild(trashWrap)
        trashWrap.appendChild(trashIcon)
        trashWrap.classList.add("trash-wrap")
        trashIcon.classList.add("trash-icone")
        imageElement.src = work.imageUrl;
        
        worksWrap.appendChild(workElement)

        const borderWrap = document.createElement("div")
        borderWrap.classList.add("border-wrap")
    });
}
// suppression : pas recall Api/ pas de refresh 
//event.listener sur les trash buttons pour chaque work dans la gallery 
// dans l'event je recup l'id --> call API delete // verif du call API /le retrouver a partir de l'id
//enleve le work de la global avec javascript ("remove item")
//si bien supprimer je regenere les gallery 

// ajout : same same but different 
// crea variable new work , que j'ajoute a mon tableau de works et regenerate gallery 