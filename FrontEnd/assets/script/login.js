const form = document.querySelector("form");
const baliseEmail = document.getElementById("email");
let regexMail = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
let regexPassword = new RegExp ("[a-z0-9._-]")

Function

async function fetchData(apiEndPoint) {
    try {
        const response = await fetch(`http://localhost:5678/api/users/${apiEndPoint}`)
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
    return fetchData("login")
}

// Email check 

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const baliseEmail = document.getElementById("email")
    const valueEmail = baliseEmail.value
    const balisePassword = document.getElementById("password")
    const valuePAssword = balisePassword.value

        switch (valueEmail) {
            case (regexMail.test(valueEmail)) :
            baliseEmail.classList.add("valid")
        }

        // if (regexMail.test (valueEmail)) {
        //     baliseEmail.classList.add("valid")
        //     balisePassword.classList.add("valid")
        // } else {
        //     baliseEmail.classList.add("false")
        //     balisePassword.classList.add("false")
        // }
})
