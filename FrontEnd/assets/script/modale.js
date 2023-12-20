const target = document.getElementById("modal1");
const modalWrap = document.createElement("div")
target.appendChild(modalWrap)
modalWrap.classList.add("modal-wrapper")


const openModal = function (e) {
    e.preventDefault();

    if (target) {
        target.style.display = "flex";
        target.setAttribute("aria-modal", "true");
    }
};

const modalLink = document.querySelector('.open-modal');
modalLink.addEventListener('click', openModal);

































// const modal = document.getElementById("modal1")
//     modal.addEventListener('click' , openModal)

// function openModal(e) {
//     e.preventDefault()
//     const target = document.querySelector(e.target.getAttribute('href'))
//     target.style.display = null;
// }


