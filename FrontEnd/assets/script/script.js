// Variable

let works = [];
let categories = []
const buttonTous = document.createElement("button");

// Initialization

window.onload = async function () {
    works = await fetchWorks();
    const categories = await fetchCategories();
    await generateCategories(categories);
    await generateGallery(works);
};

// window.localStorage.clear();

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

async function generateCategories(categories) {
    const buttonsContainer = document.querySelector(".buttons");
    buttonsContainer.appendChild(buttonTous)

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
            await generateGallery(filteredWorks);
        });
    });
}

 async function generateGallery(data) {
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML = "";

        data.forEach(work => {
            const workElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;

            const nameElement = document.createElement("p");
            nameElement.innerText = work.title;

            workElement.appendChild(imageElement);
            workElement.appendChild(nameElement);

            gallerySection.appendChild(workElement);
        });
}

const storedToken = sessionStorage.getItem("token");

if (storedToken) {
    const openModal = document.getElementById("open-modal");
    openModal.classList.remove("invisible");
    console.log(storedToken)
} else {
    // Le token n'est pas présent dans la session
    console.log("Aucun token trouvé dans la session.");
}
