async function updateData() {
    
    try {
        const reponse = await fetch("http://localhost:5678/api/works");
        if (!reponse.ok) {
            throw new Error(`Échec de la requête avec le code d'état : ${reponse.status}`);
          }
          const works = await reponse.json();
          return works;
    } catch (error) {
          console.error(`Une erreur s'est produite : ${error.message}`);
    }
}

updateData()


async function genereOeuvre(works) {
    try {
        const sectionOeuvres = document.querySelector(".gallery");
        sectionOeuvres.innerHTML = "";

        for (let i = 0; i < works.length; i++) {
            const oeuvre = works[i];

            const oeuvreElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = oeuvre.imageUrl;

            const nomElement = document.createElement("p");
            nomElement.innerText = oeuvre.title;

            oeuvreElement.appendChild(imageElement);
            oeuvreElement.appendChild(nomElement);

            sectionOeuvres.appendChild(oeuvreElement);
        }
    } catch (error) {
        
    }
}

genereOeuvre()

window.onload = async function () {
        const works = await updateData();
        await genereOeuvre(works);
};

const buttonTous = document.getElementById("btn-tous");
buttonTous.addEventListener("click", async function () {
    const works = await updateData()
    document.querySelector(".gallery").innerHTML=""
    genereOeuvre(works)
    console.log(works)
})

const buttonObjets = document.getElementById("btn-objets");
buttonObjets.addEventListener("click", async function () {
        const works = await updateData();
        const oeuvresFiltrees = works.filter(function(oeuvre) {
            return oeuvre.category.name ==="Objets";
        });
        await genereOeuvre(oeuvresFiltrees)
        console.log(oeuvresFiltrees)
    });    

const buttonAppartement = document.getElementById("btn-appartement")
buttonAppartement.addEventListener("click", async function() {
    const works = await updateData();
    const oeuvresFiltrees = works.filter(function(oeuvre) {
        return oeuvre.category.name === "Appartements"
    })
    await genereOeuvre(oeuvresFiltrees)
    console.log(oeuvresFiltrees)
})
  
const buttonHotelRestaurnt = document.getElementById("btn-hotelslRestaurants")
buttonHotelRestaurnt.addEventListener("click", async function (){
    const works = await updateData();
    const oeuvresFiltrees = works.filter(function(oeuvre) {
        return oeuvre.category.name === "Hotels & restaurants"
        
    })
    await genereOeuvre(oeuvresFiltrees)
    console.log(oeuvresFiltrees)
})