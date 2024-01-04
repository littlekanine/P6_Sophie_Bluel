// Variable
import { fetchData } from "./script.js";
import { works } from "./script.js"

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

// switch to modal addWorks

function openModaleAddWorks(e) {
    e.preventDefault();

        const addImg = document.querySelector(".div-picture")
        addImg.classList.remove("invisible")
        addImg.classList.add("flex")
        titleWrap.innerText= "Ajout Photos"
        addWorks.classList.add("invisible")
        worksWrap.innerHTML = ""
        worksWrap.classList.add("invisible");
        worksWrap.classList.add("invisible")
        valid.classList.remove("invisible")
        valid.classList.add("flex")
        arrowReturn.classList.remove("invisible")
        arrowReturn.classList.add("flex")
        
        arrowReturn.addEventListener("click", function(e) {
            e.preventDefault();
            const content = document.querySelector(".div-picture");
            titleWrap.innerHTML = "Galarie Photos";
            content.innerHTML = "";
            worksWrap.classList.remove("invisible");
            addWorks.classList.remove("invisible");
            valid.classList.add("invisible");
            generateGalleryWrap(works);
        });
}

//I have a big doubt, I'm sure we can do something else *****

// function resetModale() {
//     const addImg = document.querySelector(".div-picture");
//     addImg.classList.remove("flex");
//     addImg.classList.add("invisible");
//     titleWrap.innerText = "Gallerie Photo";
//     addWorks.classList.remove("invisible");
//     worksWrap.classList.add("works-wrap");
//     worksWrap.classList.remove("invisible");
//     valid.classList.add("invisible");
//     valid.classList.remove("flex");
//     arrowReturn.classList.add("invisible");
//     arrowReturn.classList.remove("flex");
// }

//****** */

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

        const borderWrap = document.createElement("div")
        borderWrap.classList.add("border-wrap")

        trashWrap.addEventListener("click" , function(e) {
            e.preventDefault();   
            const workId = work.id
            console.log('ID récupéré :', workId);
            // try {
            //     const deletedWork = await deleteWork("works", workId);
            //     console.log('work delete :', deletedWork);
            // } catch (error) {
            //     console.error('error :', error.message);
            // }
            deleteWork(workId)
        });
    });    
}

// Delete work

async function deleteWork(workId) {
    const response = await fetch(`http://localhost:5678/work/${workId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    try {
        switch(response.status) {
                case 200:
                    // Rechercher un work a partir du workId -> const work
                    // works.removeItem(work);
                    // re-generer les galleries
                    work.removeI
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