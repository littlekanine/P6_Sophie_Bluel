// import { generateGallery } from "./script.js"

async function runGenereteGallery() {
    const data = await fetch ('http://localhost:5678/api/works')
    await generateGallery(data)
}

// Variable

let modal = null

// add Elements

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




// Function

const openModal = function (e) {
    e.preventDefault();
    const target = document.getElementById("modal1");
    target.appendChild(modalWrap)
    target.style.display = "flex";
    target.setAttribute("aria-modal", "true");
    modal = target
    modal.addEventListener('click' , closeModal)
};

const modalLink = document.querySelector('.open-modal');
modalLink.addEventListener('click', openModal);

const closeModal = function(e) {
    e.preventDefault()
    if (modal === null) return
    modal.style.display = "none";
    modal.removeAttribute("aria-modal");
}





























// const modal = document.getElementById("modal1")
//     modal.addEventListener('click' , openModal)

// function openModal(e) {
//     e.preventDefault()
//     const target = document.querySelector(e.target.getAttribute('href'))
//     target.style.display = null;
// }


