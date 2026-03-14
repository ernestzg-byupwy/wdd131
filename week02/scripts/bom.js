const userInput = document.querySelector("#favchap");
const addChapBtn = document.querySelector("button");
const favChapList = document.querySelector("#list");
const valMsgPar = document.querySelector("#valMsg");
const validBOMBooks = ["1 Nephi", "2 Nephi", "Jacob", "Enos", "Jarom", "Omni", "Words of Mormon", "Mosiah", "Alma", "Helaman", "3 Nephi", "4 Nephi", "Mormon", "Ether", "Moroni"];

addChapBtn.addEventListener("click", (evt) => {

    const input = userInput.value;

    // Checks how many Elements the ul#list has and if has reach the limit of 10 it
    // will display an error message instead of trying to add the book.
    if (favChapList.childElementCount < 10) {

        valMsgPar.textContent = "";
        valMsgPar.className = "";

        // If found in the array of valid books from the Book of Mormon
        const result = isValidBOMBook(input);
        if (result.isValid) {

            // Add only if book and chapter is not present.
            if (!isPresent(result.value)) {
                if (input.trim() !== "") {
                    const li = document.createElement("li");
                    const delBtn = document.createElement("button");

                    li.textContent = result.value;
                    delBtn.textContent = "❌";
                    delBtn.setAttribute("aria-label", `Remove ${input}`);

                    li.appendChild(delBtn);
                    favChapList.appendChild(li);

                    delBtn.addEventListener("click", () => {
                        favChapList.removeChild(li);
                        userInput.focus();
                    });

                    userInput.value = "";
                    valMsgPar.textContent = "Book and chapter added to the list."
                    valMsgPar.classList.add("validMsg");
                }
            } else {
                valMsgPar.textContent = "Duplicate entry detected: this chapter already exists on the list."
                valMsgPar.classList.add("errorMsg")
            }

        } else {
            valMsgPar.textContent = result.value;
            valMsgPar.classList.add("errorMsg")
        }

    } else {
        valMsgPar.textContent = "You can only have 10 entries, try removing one!"
        valMsgPar.classList.add("errorMsg")
    }

    userInput.focus();
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
        value: undefined
    }

    if (parts.length === 2) {
        for (book of validBOMBooks) {
            if (book.toLowerCase() === parts[0].toLowerCase()) {

                result.isValid = true;
                result.value = `${book} ${parts[1]}`;

                return result;
            }
        }
    } else if (parts.length === 3) {
        for (book of validBOMBooks) {
            if (book.toLowerCase() === `${parts[0]} ${parts[1]}`.toLowerCase()) {
                result.isValid = true;
                result.value = `${book} ${parts[2]}`;

                return result;
            }
        }
    } else if (parts.length === 4) {
        // 'Words of Mormon' is at index 6
        if (validBOMBooks[6].toLowerCase() === `${parts[0]} ${parts[1]} ${parts[2]}`.toLowerCase()) {
            result.isValid = true;
            result.value = `${validBOMBooks[6]} ${parts[3]}`;

            return result;
        }
    }

    result.isValid = false;
    result.value = "Please enter a valid value book from the Book of Mormon: '{book name} {chapter}' (eg. 'Alma 5', '1 Nephi 3', 'Words of Mormon 1') ";

    return result;
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
// This function takes an input book name and chapter 'alma 5' and capitalizes it
// returning 'Alma 5'.
function standardizeInput(input) {

}
