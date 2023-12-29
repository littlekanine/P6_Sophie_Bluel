//import function
import { fetchWorks } from "./script.js"
// Variable
import { nameElement } from "./script.js"
import { works } from "./script.js"

const modalWrap = document.getElementById("modal-wrap")
// const worksWrap = document.createElement("div")
// modalWrap.appendChild(worksWrap)


// Function open/close modale

const worksWrap = document.createElement("div")

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click', openModale);

const target = document.getElementById('modal1');
target.addEventListener('click', closeModal);

let modal = null

async function generateGalleryModal (worksModal) {
    
}

// creer nv fonction generate galleryModal --> for each / similaire + div trash button



function openModale(e) {
    e.preventDefault();
    console.log(works)
    if (modal === null) {
        modal = target;

        target.classList.remove("invisible");
        target.classList.add("flex")

        worksWrap.classList.remove('gallery');
        worksWrap.classList.add('gallery-wrap');

        if (nameElement) {
            nameElement.remove();
        }
    }
    generateGalleryWrap(works)
}

async function generateGalleryWrap(works) {
    worksWrap.innerHTML=""
    data.forEach(work => {
        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        modalWrap.appendChild(worksWrap)
    });
}

function closeModal(e) {
    e.preventDefault();
    if(modal === null) return;
    if (!modalWrap.contains(e.target)) {
        target.classList.add("invisible");
        modal = null;
    }
}

// suppression : pas recall Api/ pas de refresh 
//event.listener sur les trash buttons pour chaque work dans la gallery 
// dans l'event je recup l'id --> call API delete // verif du call API /le retrouver a partir de l'id
//enleve le work de la global avec javascript ("remove item")
//si bien supprimer je regenere les gallery 

// ajout : same same but different 
// crea variable new work , que j'ajoute a mon tableau de works et regenerate gallery 