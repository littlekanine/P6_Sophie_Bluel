// Variable
const formLogin = document.querySelector("form");
const baliseEmail = document.getElementById("email");
const balisePassword = document.getElementById("password");
let apiToken = ""
const inputContainer = document.getElementById("inputContainer")
const errorMessage = document.createElement("p")
errorMessage.classList.add("errorMessage")
inputContainer.appendChild(errorMessage)

// Event Listener

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = baliseEmail.value;
    const password = balisePassword.value;

    try {
        const token = await fetchDataLogin(email, password);

        if (token) {
            window.location.href = "/FrontEnd/index.html";
        } else {
            baliseEmail.classList.add("invalid")
            balisePassword.classList.add("invalid")
            errorMessage.textContent = "Input error: invalid email or password"
            console.error("Token not recovered. Failed connection.");
        }

    } catch(error){
        console.error("An error has occurred :", error);
    }
});


// function for data recovery from the API

async function fetchDataLogin(email, password) {
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),

        });

        if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        const data = await response.json();

        if ("token" in data && "userId" in data) {
        apiUserId = data.userId;
         apiToken = data.token;

        console.log("Token retrieved from the API:", apiToken);
        console.log("User ID retrieved from the API:", apiUserId);

        } else {
        console.error("API data is incomplete.");
        }
        return apiToken
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
}
