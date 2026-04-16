// Footer Dynamic date 
const today = new Date();
const year = document.querySelector("#currentYear");
const lastModified = document.getElementById("lastModified");

year.innerHTML = `${today.getFullYear()}`;
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

// Menu interactivity
const btnMenu = document.querySelector("#menu-icon");
const navElm = document.querySelector("nav");
const navigUl = document.querySelector("#navigation");

// Toggles the 'open' class on some elements of interest
function toggleOpenClass() {
    btnMenu.classList.toggle("open");
    navElm.classList.toggle("open");
    navigUl.classList.toggle("open");
}

btnMenu.addEventListener("click", toggleOpenClass);
