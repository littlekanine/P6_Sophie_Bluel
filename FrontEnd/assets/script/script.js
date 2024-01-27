// Variable Array

export let works = [];
export let newWorks = [];
export let categoriesData = [];

// Variable buttons 
const buttonsContainer = document.querySelector(".buttons");
const buttonTous = document.createElement("button");

//variable Login
const logIn = document.getElementById("btn-login");
const btnLogOut = document.getElementById("btn-logout");

//variable modal
const editMode = document.querySelector(".edit-mode");
const openModal = document.getElementById("open-modal");

// Initialization

window.onload = async function () {
    buttonTous.classList.add("button-tous")
    works = await fetchWorks();
    const categories = await fetchCategories();
    await generateCategories(categories);
    await generateGallery(works);
};

// Button outside API 

buttonTous.classList.add("button-filtres", "buttonTous");
    buttonTous.innerText = "Tous"

buttonTous.addEventListener("click", async function () {
    document.querySelector(".gallery").innerHTML=""
    const allWorks = await fetchWorks();
    generateGallery(allWorks);
})
    

// Function 

async function fetchData(apiEndPoint) {
    try {
        const response = await fetch(`http://localhost:5678/api/${apiEndPoint}`)
            .then((response) => {
                switch(response.status) {
                    case 200:
                        return response.json();
                    case 500:
                    default:
                        throw new Error(`Échec de la requête avec le code d'état : ${response.status}`);
                }
            })
            .then((response) => {
                return response;
            });
        
        return response;
    } catch (error) {
        console.error(`Une erreur s'est produite : ${error.message}`);
    }
}
async function fetchCategories() {
    return fetchData("categories");
}
async function fetchWorks() {
    return fetchData("works");
}

export {fetchData};

export async function generateCategories(categories) {
    buttonsContainer.appendChild(buttonTous);
    const select = document.getElementById("category");

    categories.forEach(categorie => {
        const buttonFiltres = document.createElement("button");
        buttonsContainer.appendChild(buttonFiltres);
        buttonFiltres.classList.add("button-filtres");
        buttonFiltres.innerText = categorie.name;  

        const option = document.createElement("option");
        option.value = categorie.name;
        option.text = categorie.name
        select.appendChild(option);

        buttonFiltres.addEventListener("click", async () => {
            buttonFiltres.classList.add("green")
            buttonTous.classList.remove("button-tous")
            const filteredWorks = works.filter(function (work){
                return work.category.id === categorie.id;
                
            });
            await generateGallery(filteredWorks);
        });  
    });
    categoriesData = categories;
}

export async function generateGallery(works) {
    const gallerySection = document.querySelector(".gallery");
    gallerySection.innerHTML = "";

        works.forEach(work => {
            const workElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            const nameElement = document.createElement("p");
            imageElement.src = work.imageUrl;
            nameElement.innerText = work.title;

            workElement.appendChild(imageElement);
            workElement.appendChild(nameElement);

            gallerySection.appendChild(workElement);
        });
}

const storedToken = sessionStorage.getItem("token");

export {storedToken};

if (storedToken) {
    buttonsContainer.classList.add("invisible");
    openModal.classList.remove("invisible");
    editMode.classList.remove("invisible");
    logIn.classList.add("invisible");

} else {
    const logOut = document.getElementById("btn-logout");
    logOut.classList.add("invisible");
    openModal.classList.add("invisible");
    editMode.classList.add("invisible");
    logIn.classList.remove("invisible");
}

btnLogOut.addEventListener("click", logOut)

function logOut() {
    sessionStorage.removeItem("token");
}
