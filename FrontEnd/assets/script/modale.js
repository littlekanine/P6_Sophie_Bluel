//import function
import { generateGallery } from "./script.js"

// Variable
import { nameElement } from "./script.js"
import { works } from "./script.js"

let modal = null

const modalWrap = document.createElement("div")
modalWrap.classList.add("modal-wrapper")
console.log(modalWrap)

const wrapContent = document.createElement("article")
modalWrap.appendChild(wrapContent)

const titleWrap = document.createElement("h3")
wrapContent.appendChild(titleWrap)

titleWrap.innerText="Galerie Photo"
titleWrap.classList.add("title-wrap")

const galleryWrap = document.createElement("div")
wrapContent.appendChild(galleryWrap)
galleryWrap.classList.add("gallery")

// Function open/close modale

const modalLink = document.getElementById('open-modal');
const target = document.getElementById('modal1');
modalLink.addEventListener('click', openModale);

function openModale(e) {
    e.preventDefault();
    if (modal === null) {
        target.appendChild(modalWrap);
        target.style.display="flex"
        modal = target;

        generateGallery(works);
        galleryWrap.classList.remove('gallery');
        galleryWrap.classList.add('gallery-wrap');
        if (nameElement) {
            nameElement.remove();
        }

        // Ajouter un écouteur d'événements pour fermer la modale en cliquant à l'extérieur
        target.addEventListener('click', closeModal);
    }
}

function closeModal() {
    if(modal === null) return;

    modal.style.display = "none";
    target.classList.add("invisible");

    target.removeEventListener('click', closeModal);
}