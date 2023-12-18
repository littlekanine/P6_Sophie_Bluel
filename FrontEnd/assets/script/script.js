// Variable
let works = [];
let categories = []
const buttonTous = document.createElement("button");
// Initialization
window.onload = async function () {
    const works = await fetchWorks();
    const categories = await fetchCategories();
    await generateCategories(categories);
    await generateGallery(works);
};

// Button outside API 

buttonTous.classList.add("button-filtres", "buttonTous")
    buttonTous.innerText = "Tous"

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
    buttonsContainer.classList.add("filtres")
    buttonsContainer.appendChild(buttonTous)

    categories.forEach(categorie => {
        const buttonsFiltres = document.createElement("button");
        buttonsContainer.appendChild(buttonsFiltres)
        buttonsFiltres.classList.add("button-filtres")
        buttonsFiltres.innerText = categorie.name

        buttonsFiltres.addEventListener("click", async () => {
            const allWorks = await fetchWorks();
            const filteredWorks = allWorks.filter(function (work){
                return work.category.name === categorie.name;
            });
            await generateGallery(filteredWorks);
        });
    });

}

async function generateGallery(Data) {
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML = "";

        Data.forEach(work => {
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

buttonTous.addEventListener("click", async function () {
    document.querySelector(".gallery").innerHTML=""
    const allWorks = await fetchWorks()
    generateGallery(allWorks);
})
