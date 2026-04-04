const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        // Modified the url form 400x225 to 400x250 to match all other images
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x250/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "San Salvador El Salvador",
        location: "Antiguo Cuscatlán, La Libertad, El Salvador",
        dedicated: "2011, August, 21",
        area: 27986,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-salvador-el-salvador/400x250/san-salvador-el-salvador-temple-lds-848546-wallpaper.jpg"
    },
    {
        templeName: "Guatemala City Guatemala",
        location: "Guatemala City, Guatemala, Guatemala",
        dedicated: "1984, December, 14",
        area: 11610,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/guatemala-city-guatemala/400x250/guatemala-city-temple-lds-829605-wallpaper.jpg"
    },
    {
        templeName: "Tegucigalpa Honduras",
        location: "Comayagüela, Francisco Morazán, Honduras",
        dedicated: "2013, March, 17",
        area: 28254,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tegucigalpa-honduras/400x250/tegucigalpa-honduras-temple-lds-1075426-wallpaper.jpg"
    },
];

const hamMenuBtn = document.querySelector("#menu");
const navElm = document.querySelector("nav");
const navigUl = document.querySelector("#navigation");
const galleryDiv = document.querySelector("#gallery");

// Toggles the 'open' class on some elements of interest
function toggleOpenClass() {
    hamMenuBtn.classList.toggle("open");
    navElm.classList.toggle("open");
    navigUl.classList.toggle("open");
}

hamMenuBtn.addEventListener("click", toggleOpenClass);

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
            toggleOpenClass();
        }
    }
});

function createAndDisplayTempleCards(temples) {
    galleryDiv.innerHTML = "";

    temples.forEach((temple) => {

        const card = document.createElement("div");
        const name = document.createElement("h3");

        const details = document.createElement("div");
        const location = document.createElement("p");
        const dedicated = document.createElement("p");
        const area = document.createElement("p");

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.setAttribute("src", `${temple.imageUrl}`);
        image.setAttribute("alt", `${temple.name} Temple.`);
        image.setAttribute("loading", "lazy");

        figure.appendChild(image);

        name.textContent = temple.templeName;
        location.innerHTML = `LOCATION: <span class="data-value">${temple.location}</span>`;
        dedicated.innerHTML = `DEDICATED: <span class="data-value">${temple.dedicated}</span>`;
        area.innerHTML = `SIZE: <span class="data-value">${temple.area} sq ft</span>`;

        card.setAttribute("class", "temple-card");
        details.setAttribute("class", "details");

        details.appendChild(location);
        details.appendChild(dedicated);
        details.appendChild(area);

        card.appendChild(name);
        card.appendChild(details);
        card.appendChild(figure);

        galleryDiv.appendChild(card);
    })
};

createAndDisplayTempleCards(temples);

const linkHome = document.querySelector("#link-home");
const linkOld = document.querySelector("#link-old");
const linkNew = document.querySelector("#link-new");
const linkLarge = document.querySelector("#link-large");
const linkSmall = document.querySelector("#link-small");

linkHome.addEventListener("click", () => {
    createAndDisplayTempleCards(temples);
});

linkOld.addEventListener("click", () => {
    const oldTemples = temples.filter((temple) => temple.dedicated.split(", ")[0] < 1900)

    createAndDisplayTempleCards(oldTemples);
});

linkNew.addEventListener("click", () => {
    const newTemples = temples.filter((temple) => temple.dedicated.split(", ")[0] > 2000)

    createAndDisplayTempleCards(newTemples);
});

linkLarge.addEventListener("click", () => {
    const largeTemples = temples.filter((temple) => temple.area > 90_000)

    createAndDisplayTempleCards(largeTemples);
});

linkSmall.addEventListener("click", () => {
    const smallTemples = temples.filter((temple) => temple.area < 10_000)

    createAndDisplayTempleCards(smallTemples);
});