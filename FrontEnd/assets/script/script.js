// Variable Array

export let works = [];
export let newWorks = [];
export let categoriesData = [];
// export let categories = [];

// Variable buttons 
const buttonsContainer = document.querySelector(".buttons");
const buttonTous = document.createElement("button");

//variable Login
const logIn = document.getElementById("btn-login")
const btnLogOut = document.getElementById("btn-logout");

//variable modal
const editMode = document.querySelector(".edit-mode")
const openModal = document.getElementById("open-modal");

// Initialization

window.onload = async function () {
    works = await fetchWorks();
    const categories = await fetchCategories();
    await generateCategories(categories);
    await generateGallery(works);
};

// Button outside API 

buttonTous.classList.add("button-filtres", "buttonTous")
    buttonTous.innerText = "Tous"

buttonTous.addEventListener("click", async function () {
    document.querySelector(".gallery").innerHTML=""
    const allWorks = await fetchWorks()
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
    return fetchData("categories")
}
async function fetchWorks() {
    return fetchData("works")
}

export {fetchData}

export async function generateCategories(categories) {
    buttonsContainer.appendChild(buttonTous)
    const datalist = document.getElementById("categoryOptions");
    datalist.innerHTML = ""

    categories.forEach(categorie => {
        
        const buttonFiltres = document.createElement("button");
        buttonsContainer.appendChild(buttonFiltres)
        buttonFiltres.classList.add("button-filtres")
        buttonFiltres.innerText = categorie.name  

        buttonFiltres.addEventListener("click", async () => {
            const filteredWorks = works.filter(function (work){
                console.log(works)
                return work.category.name === categorie.name;
            });
            categoriesData = categories;
            await generateGallery(filteredWorks);
        });  
    });
    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.name;
        datalist.appendChild(option);
    });
    const optionTous = document.createElement("option");
    optionTous.value = "Tous";
    datalist.appendChild(optionTous);
}

export async function generateGallery(data) {
    const gallerySection = document.querySelector(".gallery");
    gallerySection.innerHTML = "";

        data.forEach(work => {
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

// export {generateGallery}


const storedToken = sessionStorage.getItem("token");
export {storedToken}

if (storedToken) {
    buttonsContainer.classList.add("invisible")
    openModal.classList.remove("invisible");
    editMode.classList.remove("invisible")
    logIn.classList.add("invisible")

    console.log(storedToken)
} else {
    const logOut = document.getElementById("btn-logout")
    logOut.classList.add("invisible")
    openModal.classList.add("invisible");
    editMode.classList.add("invisible")
    logIn.classList.remove("invisible")

    console.log(storedToken)

}

btnLogOut.addEventListener("click", logOut)

function logOut() {
    sessionStorage.removeItem("token")
    console.log("token retiré")
}
