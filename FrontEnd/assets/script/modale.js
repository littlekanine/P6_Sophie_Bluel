// Variable import
import { categoriesData, works, generateGallery, storedToken } from "./script.js";

//stocked Token

const token = storedToken;

// Varibale Modal

const modalLink = document.getElementById('open-modal');
modalLink.addEventListener('click', openModale);

const target = document.getElementById('modal1');

const worksWrap = document.querySelector(".works-wrap");

const addWorks = document.getElementById("add-works");
addWorks.addEventListener("click", openModaleAddWorks);

const arrowReturn = document.querySelector(".arrow");

// Modal

let modal = null;

//open/close modal function

function openModale(e) {
    e.preventDefault();
    if (modal === null) {
        modal = target;

        target.classList.remove("invisible");
        target.classList.add("flex");
    }
    generateGalleryWrap(works);
}

function closeModal(e) {
    e.preventDefault();
    if (modal !== null) {
        target.classList.remove("flex");
        target.classList.add("invisible");
        modal = null;
    }
}

const xMark = document.querySelector(".xmark");
xMark.addEventListener("click", closeModal);

// generate Gallery Wrap

let currentWorkId;

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

        trashWrap.addEventListener("click", async function (e) {
            e.preventDefault();
            currentWorkId = work.id;
            works = works.filter(work => work.id !== currentWorkId);
            await deleteWork(currentWorkId);
        });
    });
}

// Delete work

async function deleteWork(currentWorkId) {
    const response = await fetch(`http://localhost:5678/api/works/${currentWorkId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    switch (response.status) {
        case 204:
            const index = works.findIndex((work) => work.id === currentWorkId);
            if (index !== -1) {
                works.splice(index, 1);
            }
            generateGalleryWrap(works);
            generateGallery(works);
            break;
        case 401:
            break;
        default:
            throw new Error(`erreur : ${response.status}`);
    }
}

// switch to modal addWorks

function openModaleAddWorks(e) {
    e.preventDefault();
    const galleryModal = document.querySelector(".gallery-modal");
    galleryModal.classList.add("invisible");
    const addImg = document.querySelector(".div-picture");
    addImg.classList.remove("invisible");
    addImg.classList.add("flex");
    arrowReturn.classList.remove("hidden");

    arrowReturn.addEventListener("click", function (e) {
        e.preventDefault();
        const pictureModal = document.querySelector(".div-picture");
        pictureModal.classList.add("invisible");
        galleryModal.classList.remove("invisible");
        arrowReturn.classList.add("hidden");
    });
}

//addWorks

const buttonAddPicture = document.getElementById("button-add-picture");
const addPicture = document.getElementById("add-picture");
const valid = document.getElementById("valid");
const errorNewWork = document.getElementById("error-new-work");
const validNewWork = document.getElementById("valid-new-work");

const selectedImage = document.getElementById("selected-image");

addPicture.addEventListener("change", function () {
    const selectedFile = addPicture.files[0];
    if (selectedFile) {
        selectedImage.src = URL.createObjectURL(selectedFile);
        buttonAddPicture.classList.add("invisible");
    }
});

valid.addEventListener("click", function (e) {
    e.preventDefault();
    const imageUrl = selectedImage.src;
    let titleInput = document.getElementById("title-new-work");
    const categoryInput = document.getElementById("category");
    const validCategories = categoriesData.map(category => category.name);
    if (titleInput.value === "" || (!validCategories.includes(categoryInput.value)) || imageUrl === "") {
        errorNewWork.classList.remove("invisible");
        validNewWork.classList.add("invisible");
    } else {
        addNewWorks(titleInput.value, categoryInput.value, imageUrl);
        errorNewWork.classList.add("invisible");
        validNewWork.classList.remove("invisible");
        titleInput.value = "";
        categoryInput.value = "";
        buttonAddPicture.classList.remove("invisible");
        selectedImage.src = "";
    }
});

async function addNewWorks(titleInput, categoryInput) {

    const selectedCategory = categoriesData.find(category => category.name === categoryInput);

    const formDataWork = new FormData();
    formDataWork.append('title', titleInput);
    formDataWork.append('category', selectedCategory.id);
    formDataWork.append('image', addPicture.files[0]);

    await addWork(formDataWork);
}

async function addWork(formDataWork) {

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formDataWork,
        });

        switch (response.status) {
            case 201:
                const responseData = await response.json();
                works.push(responseData);
                generateGalleryWrap(works);
                generateGallery(works);
                break;
            case 400:
                console.log("Mauvais requête");
                break;
            case 401:
                console.log("Non autorisé");
                break;
            default:
                throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
    } catch (error) {
        throw new Error('Erreur');
    }
}
