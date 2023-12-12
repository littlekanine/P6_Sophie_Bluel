// Variable
let works = [];
const buttonTous = document.getElementById("btn-tous");
const buttonObjets = document.getElementById("btn-objets");
const buttonHotelRestaurnt = document.getElementById("btn-hotelslRestaurants")

const buttonLogin = document.getElementById("btn-login")
// buttonLogin.addEventListener("click", function(){
    
// })

// Function 
// Initialization
window.onload = async function () {
    const works = await fetchWorks();
    await generateGallery(works);
};

async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
            .then((response) => {
                switch(response.status) {
                    case 200:
                        return response.json();
                    case 500:
                    default:
                        throw new Error(`Échec de la requête avec le code d'état : ${response.status}`);
                    ;
                }
            })
            .then((response) => {
                works = response;

                return works;
            });

        return response;
    } catch (error) {
          console.error(`Une erreur s'est produite : ${error.message}`);
    }
}

async function generateGallery(works) {
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML = "";

        works.forEach(work => {
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
    generateGallery(works);
    console.log(works);
})


buttonObjets.addEventListener("click", async function () {
        const oeuvresFiltrees = works.filter(function(oeuvre) {
            return oeuvre.category.name ==="Objets";
        });
        await generateGallery(oeuvresFiltrees);
        console.log(oeuvresFiltrees);
    });    

buttonAppartement.addEventListener("click", async function() {
    const oeuvresFiltrees = works.filter(function(oeuvre) {
        return oeuvre.category.name === "Appartements"
    })
    await generateGallery(oeuvresFiltrees);
    console.log(oeuvresFiltrees);
})
  

buttonHotelRestaurnt.addEventListener("click", async function (){
    const oeuvresFiltrees = works.filter(function(oeuvre) {
        return oeuvre.category.name === "Hotels & restaurants"
        
    })
    await generateGallery(oeuvresFiltrees);
    console.log(oeuvresFiltrees);
})