const hamMenuBtn = document.querySelector("#menu");
const navElm = document.querySelector("nav");
const navigUl = document.querySelector("#navigation");

hamMenuBtn.addEventListener("click", () => {
    hamMenuBtn.classList.toggle("open");
    navElm.classList.toggle("open");
    navigUl.classList.toggle("open");

    // navElm.parentElement.firstChild.nodeValue = ""
    console.log(navElm.parentElement.childNodes);
});


// Usage of MediaQueryList to get the update on the status of a media query on the document 
// it triggers a change event every time there is a change on the media queries
const mediaQList = window.matchMedia("(min-width: 35rem)");

// Attaching an Event Listener to detect the "change" event triggered by the MediaQueryList object
mediaQList.addEventListener("change", (evt) => {

    // Checking if the change on the 
    if (evt.matches) {

        // Toggle the open class only if it is already added (toggled) on the elements
        // The purpose of this is to close the Hamburger Menu when changes on media query occur
        // because the HamMenu will change to 'display: none' on media query, 
        // but remains with the 'open' class.
        if (hamMenuBtn.classList.contains("open")) {
            hamMenuBtn.classList.toggle("open");
            navElm.classList.toggle("open");
            navigUl.classList.toggle("open");
        }
    }
});