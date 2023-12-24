//import function
import { generateGallery } from "./script.js"

// Variable
import { nameElement } from "./script.js"
import { works } from "./script.js"

const modalWrap = document.getElementById("modal-wrap")

const wrapContent = document.querySelector(".wrap-content")

const galleryWrap = document.querySelector(".gallery-wrap")

// Function open/close modale

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click', openModale);

const target = document.getElementById('modal1');

let modal = null

function openModale(e) {
    e.preventDefault();
    if (modal === null) {
        modal = target;
        target.classList.remove("invisible");
        console.log("c'est good ?")
        generateGallery(works);
        galleryWrap.classList.remove('gallery');
        galleryWrap.classList.add('gallery-wrap');
        if (nameElement) {
            nameElement.remove();
        }

        // target.addEventListener('click', closeModal);
    }
    return modal
}

function closeModal(e) {
    e.preventDefault
    if(modal === null) return;

    target.classList.add("invisible");

    // target.addEventListener('click', closeModal);
    return modal
}

target.addEventListener('click', closeModal);