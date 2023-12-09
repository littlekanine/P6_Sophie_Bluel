async function updateData() {
    try {
        const reponse =  fetch("http://localhost:5678/api/works");
        if (!reponse.ok) {
            throw new Error(`Échec de la requête avec le code d'état : ${reponse.status}`);
          }
          const data = await reponse.json();
          return data;
    } catch (error) {
          console.error(`Une erreur s'est produite : ${error.message}`);
    }
}

updateData().then(data => console.log(data)).catch(error => console.error(error));



function genereOeuvre(reponse) {
    for (let i = 0 ; i < oeuvres.length ; i ++);

        const article = oeuvre[i];
        const sectionOeuvres = document.querySelector(".gallery")
        const oeuvreElement = document.createElement("figure")
        const imageElement = document.createElement("img")
        imageElement.src = fetch("http://localhost:5678/api/works/imageUrl")
        const nomElement = document.createElement("p")
        nomElement.innerText = fetchc ("http://localhost:5678/api/works/title")
        
}