// Variable

const formLogin = document.querySelector("form");
const baliseEmail = document.getElementById("email");
const balisePassword = document.getElementById("password");
const inputContainer = document.getElementById("inputContainer");
const errorMessage = document.createElement("p");
inputContainer.appendChild(errorMessage);
errorMessage.classList.add("errorMessage");

// Event Listener

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = baliseEmail.value;
    const password = balisePassword.value;
    fetchDataLogin(email, password);
});

// function for data recovery from the API

function fetchDataLogin(email, password) {
    const response = fetch("http://localhost:5678/api/users/login", {
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
                errorMessage.textContent = "Email ou mot de passe invalide";
                throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }
    })
    .then((response) => {
        if(response.token) {
            window.sessionStorage.setItem("token", response.token);
            window.location.href = "../index.html";
            return response.token;
        }
        throw new Error(`Il n'y a pas de token dans la réponse : ${response}`);
    });
}
