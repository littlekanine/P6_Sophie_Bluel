//import function

import { generateGallery } from "./script.js"

// Variable
import { nameElement } from "./script.js"
import { works } from "./script.js"
let modal = null

const modalWrap = document.createElement("div")
modalWrap.classList.add("modal-wrapper")

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

function openModale(e) {
    e.preventDefault();
    const target = document.getElementById("modaleRemoveGallery");
    target.appendChild(modalWrap)
    target.style.display = "flex";
    modal = target

    generateGallery(works)
    galleryWrap.classList.remove("gallery")
    galleryWrap.classList.add("gallery-wrap")
    if (nameElement) {
        nameElement.remove();
    }
    
    modal.addEventListener('click' , closeModal)

};

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click', openModale);

const closeModal = function(e) {
    e.preventDefault()
    if (modal === null) return
    modal.style.display = "none";
    modal.removeAttribute("aria-modal");
}

//generate gallery in modal




