// Variable

const form = document.querySelector("form");
const baliseEmail = document.getElementById("email");
const balisePassword = document.getElementById("password")
let regexMail = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
let regexPassword = new RegExp ("[a-z0-9._-]+")

// Function

async function fetchToken() {
    try {
        const response = await fetch (`http://localhost:5678/api/users/login`, {
            method: `POST`,
            headers : {"Content-Type":"application/json" }
        })
            .then((response) => {
                switch(response.status) {
                    case 200 : 
                        return response.json
                    default :
                        throw new Error(`Échec de la requête avec le code d'état : ${response.status}`); 
                }
            })
            .then((response) => {
                                return response;
            });
        return response
    } catch(e) {
        console.log("probleme")
    }
    console.log(response)
}

function checkEmail (baliseEmail) {
    const valueEmail = baliseEmail.value;

    if (regexMail.test(valueEmail)) {
        baliseEmail.classList.add("valid");
        baliseEmail.classList.remove("invalid");
        console.log("correct")
    } else {
        baliseEmail.classList.add("invalid");
        baliseEmail.classList.remove("valid");
            throw new Error ("The email is incorrect ");
    }
}

function checkPassword(balisePassword) {
    const valuePAssword = balisePassword.value

    if (regexPassword.test(valuePAssword)) {
        balisePassword.classList.add("valid")
        balisePassword.classList.remove("invalid")
    } else {
        balisePassword.classList.add("invalid")
        balisePassword.classList.remove("valid")
            throw new Error ("The password is incorrect ")
    }
}

form.addEventListener("submit", (event) => {
        event.preventDefault();
            try {
                checkEmail (baliseEmail)
                checkPassword(balisePassword)
            } catch {

            }
        
})


// async function fetchToken() {
//     try {
//         const response = await fetch(`http://localhost:5678/api/users/login`)
//             .then((response) => {
//                 switch(response.status) {
//                     case 200:
//                         return response.json();
//                     case 401 :
//                         throw new Error(`Échec de la requête avec le code d'état : ${response.status}`);
//                     default:
//                         throw new Error(`Échec de la requête avec le code d'état : ${response.status}`);
//                 }
//             })
//             .then((response) => {
//                 return response;
//             });
        
//         return response;
    
//     } catch (error) {
//           console.error(`Une erreur s'est produite : ${error.message}`);
//     }
// }

// async function fetchLogin() {
//     return fetchToken("login");
// }