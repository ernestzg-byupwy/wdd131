const today = new Date();

const year = document.querySelector("#currentYear");
const lastModified = document.getElementById("lastModified");

year.innerHTML = `${today.getFullYear()}`;
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;