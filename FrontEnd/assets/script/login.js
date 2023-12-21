// Variable

const formLogin = document.querySelector("form");
const baliseEmail = document.getElementById("email");
const balisePassword = document.getElementById("password");
const inputContainer = document.getElementById("inputContainer")
const errorMessage = document.createElement("p")
errorMessage.classList.add("errorMessage")
inputContainer.appendChild(errorMessage)

// Event Listener

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = baliseEmail.value;
    const password = balisePassword.value;

    // Faire une verification que email et password continent quelque chose. Si oui -> faire le fetch , si non -> afficher une message d'erreur ou mettre rouge

    await fetchDataLogin(email, password);
});


// function for data recovery from the API

async function fetchDataLogin(email, password) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        switch(response.status) {
            case 200:
                return response.json();
            case 401:
            default:
                baliseEmail.classList.add("invalid");
                balisePassword.classList.add("invalid");
                errorMessage.textContent = "Input error : invalid email or password";
                throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
    })
    .then((response) => {
        if(response.token) {
            window.sessionStorage.setItem("token", response.token);
            // Afficher sur le index.html : bouton modifier, la  baniere, passer "login" en "logout"
            // Récupérer la div qui continent le bouton modifer -> ajouter une class qui ajoute "display: block". -> display: none -> display: block
            // Rediriger vers index.html

            window.location.href = "../index.html";


            return response.token;
        }

        throw new Error(`No token in the response : ${response}`);
    });
}
