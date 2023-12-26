//import function
import { generateGallery } from "./script.js"

// Variable
import { nameElement } from "./script.js"
import { works } from "./script.js"

const modalWrap = document.getElementById("modal-wrap")

const wrapContent = document.querySelector(".wrap-content")

const galleryWrap = document.getElementById("works-wrap");

// Function open/close modale

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click', openModale);

const target = document.getElementById('modal1');
target.addEventListener('click', closeModal);

let modal = null

async function loadGallery(works) {
    try {
        const galleryContent = await generateGallery(works);
        galleryWrap.innerHTML = galleryContent;
    } catch (error) {
        console.error("Une erreur s'est produite lors de la génération de la galerie :", error);
    }
}

function openModale(e) {
    e.preventDefault();
    if (modal === null) {
        modal = target;
        target.classList.remove("invisible");
        target.classList.add("flex")
        galleryWrap.classList.remove('gallery');
        galleryWrap.classList.add('gallery-wrap');
        loadGallery(works)
        // galleryWrap.innerHTML = generateGallery(works)
        console.log(works)
        if (nameElement) {
            nameElement.remove();
        }
    }
}

function closeModal(e) {
    e.preventDefault();
    if(modal === null) return;
    if (!modalWrap.contains(e.target)) {
        target.classList.add("invisible");
        modal = null;
    }
}