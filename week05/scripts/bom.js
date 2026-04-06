const userInput = document.querySelector("#favchap");
const addChapBtn = document.querySelector("button");
const favChapList = document.querySelector("#list");
const valMsgPar = document.querySelector("#valMsg");
const validBOMBooks = ["1 Nephi", "2 Nephi", "Jacob", "Enos", "Jarom", "Omni", "Words of Mormon", "Mosiah", "Alma", "Helaman", "3 Nephi", "4 Nephi", "Mormon", "Ether", "Moroni"];

const lsFavChapsKey = "bom-fav-chaps"; // Local storage key to access the chapters stored
let chaptersArray = getChapterList() || [];

addChapBtn.addEventListener("click", (evt) => {

    const input = userInput.value.trim();

    valMsgPar.textContent = "";
    valMsgPar.className = "";

    // Check if the input contains a valid book of Mormon and that it has the chapter part at the end as a number.
    let result = isValidBOMBook(input);

    if (input !== "" && !chaptersArray.includes(input) && chaptersArray.length < 10 && result.isValid) {

        // Displaying and saving result.message instead of the raw user input, even though valid
        // might not be standardized, this will ensure "alma 5" or "alMa 5" will be stored as "Alma 5"
        displayList(result.message);
        chaptersArray.push(result.message);
        setChapterList();
        userInput.value = "";
        userInput.focus();

        valMsgPar.textContent = "Book and chapter added to the list."
        valMsgPar.classList.add("validMsg");

    } else if (chaptersArray.includes(input)) {
        valMsgPar.textContent = "Duplicate entry detected: this chapter already exists on the list."
        valMsgPar.classList.add("errorMsg")

    } else if (chaptersArray.length == 10) {
        valMsgPar.textContent = "You can only have 10 entries, try removing one!"
        valMsgPar.classList.add("errorMsg")
    } else if (!result.isValid) {

        valMsgPar.textContent = result.message;
        valMsgPar.classList.add("errorMsg")
    }
});

// Takes the user input and splits the string making some assumptions on the number of
// words/characters separated by spaces. First it checks for books which name is a single word
// like Alma, second for books with two 'words' like '1 Nephi' and lastly the only three words
// book 'Words of Mormon'.
//
// To 'standardize' the book name it replaces the value with what is found on the validBOMBooks array
// that way values like 'alma', 'aLMa', etc. will be added as 'Alma'
function isValidBOMBook(input) {

    const parts = input.split(" ");
    const result = {
        isValid: undefined,
        message: undefined
    }

    if (parts.length < 2 || !isValidNumber(parts[parts.length - 1])) {
        result.isValid = false;
        result.message = `Probably missing chapter number! Last character should be a number not '${parts[parts.length - 1]}'`;

        return result;
    }

    if (parts.length === 2) {
        for (book of validBOMBooks) {
            if (book.toLowerCase() === parts[0].toLowerCase()) {

                result.isValid = true;
                result.message = `${book} ${parts[1]}`;

                return result;
            }
        }
    } else if (parts.length === 3) {
        for (book of validBOMBooks) {
            if (book.toLowerCase() === `${parts[0]} ${parts[1]}`.toLowerCase()) {
                result.isValid = true;
                result.message = `${book} ${parts[2]}`;

                return result;
            }
        }
    } else if (parts.length === 4 && isValidNumber(parts[3])) {
        // 'Words of Mormon' is at index 6
        if (validBOMBooks[6].toLowerCase() === `${parts[0]} ${parts[1]} ${parts[2]}`.toLowerCase()) {
            result.isValid = true;
            result.message = `${validBOMBooks[6]} ${parts[3]}`;

            return result;
        }
    } else if (parts.length >= 4 && !isValidNumber(parts[parts.length - 1])) {
        result.isValid = false;
        result.message = `Invalid book/format, try: {book} {chapter} eg. "Alma 5". Last character should be a number not '${parts[parts.length - 1]}'.`;

        return result;
    }

    result.isValid = false;
    result.message = "Not a valid book from the Book of Mormon. (eg. 'Alma', '1 Nephi', 'Words of Mormon')";

    return result;
}

function isValidNumber(value) {
    return typeof value === "number" || value instanceof Number || !isNaN(Number(value));
}

// Check if the book is already present on the list
function isPresent(input) {
    for (li of favChapList.children) {
        // Get the innerHTML from the li element, and split it on the first appearance of '<'
        // that will be the opening tab of the <button> element inside the <li>
        const parts = li.innerHTML.split("<");
        const bookName = parts[0];

        if (input.trim().toLowerCase() === bookName.trim().toLowerCase()) {
            return true;
        }
    }

    return false;
}

chaptersArray.forEach(displayList);

function displayList(item) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");

    li.textContent = item;
    delBtn.textContent = "❌";
    delBtn.setAttribute("aria-label", `Remove ${item}`);

    li.appendChild(delBtn);
    favChapList.appendChild(li);

    delBtn.addEventListener("click", () => {
        favChapList.removeChild(li);
        deleteChapter(li.textContent);
        userInput.focus();
    });
}

function setChapterList() {
    localStorage.setItem(lsFavChapsKey, JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem(lsFavChapsKey)); // Can ben null or undefined
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}