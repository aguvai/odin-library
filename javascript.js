const myLibrary = [];

function Book(bookData) {
    if (!new.target) {
        throw Error("Must use the new operator to call the consturctor!");
    }

    this.title = bookData[0];
    this.author = bookData[1];
    this.pages = bookData[2];
    this.yearPublished = bookData[3];
    this.read = bookData[4];

    this.uniqueID = crypto.randomUUID();

    this.toggleRead = function () {
        this.read = !this.read
        return this.read ? "Mark as Unread" : "Mark as Read";
    }
}

function addBookToLibrary(bookData) {
    myLibrary.push(new Book(bookData));
}

const cardContainer = document.querySelector(".card-container");


// CARD DISPLAY HANDLING \\

function createMainInfoContainer(book, mainCard) {
    const infoHeader = document.createElement("div");
    infoHeader.classList.add("info-header");
    mainCard.appendChild(infoHeader);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    infoHeader.appendChild(infoContainer);

    const titleText = document.createElement("h2");
    titleText.innerText = book.title;
    infoContainer.appendChild(titleText);

    const authorText = document.createElement("h3");
    authorText.innerText = `by ${book.author}`;
    infoContainer.appendChild(authorText);

    return infoHeader;
}


function setCardColor(read, mainCard, header, toggleReadButton, removeButton) {
    const infoHeader = mainCard.querySelector('.info-header');
    
    if (read === true) {
        header.style.backgroundColor = "rgb(103, 174, 110)"
        toggleReadButton.style.backgroundColor = "rgb(103, 174, 110)";
        infoHeader.style.backgroundColor = "rgb(223, 224, 175)";
        removeButton.style.backgroundColor = "rgb(50, 142, 110)";
    } else {
        header.style.backgroundColor = "rgb(205, 86, 86)"
        toggleReadButton.style.backgroundColor = "rgb(205, 86, 86)";
        infoHeader.style.backgroundColor = "rgb(230, 207, 178)";
        removeButton.style.backgroundColor = "rgb(175, 62, 62)";
    }
}

function createButtons(book, mainCard, header) {
    

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove")
    header.appendChild(removeButton);

    removeButton.addEventListener("click", (event) => {
        const card = cardContainer.querySelector(`[data-card-id="${book.uniqueID}"]`);
        card.remove();

        myLibrary.splice(myLibrary.indexOf(book), 1);
    })

    const readButtonContainer = document.createElement("div");
    readButtonContainer.classList.add("button-container");
    mainCard.appendChild(readButtonContainer);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("toggle-read");
    toggleReadButton.innerHTML = book.read ? "Mark as Unread" : "Mark as Read";
    readButtonContainer.appendChild(toggleReadButton);

    // Set card color on initial load to match book's starting read value
    setCardColor(book.read, mainCard, header, toggleReadButton, removeButton);

    toggleReadButton.addEventListener("click", (event) => {
        toggleReadButton.innerHTML = book.toggleRead();
        if (book.read === false) {
            setCardColor(false, mainCard, header, toggleReadButton, removeButton);
        } else {
            setCardColor(true, mainCard, header, toggleReadButton, removeButton);
        }
    })
}


function createYearPublishedDisplay(book, subInfoContainer) {
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("year-div")
    subInfoContainer.appendChild(yearDiv)

    const yearHeaderText = document.createElement("h4");
    yearHeaderText.innerText = "Published";
    yearDiv.appendChild(yearHeaderText);

    const yearPublishedText = document.createElement("p");
    yearPublishedText.innerText = `${book.yearPublished}`;
    yearDiv.appendChild(yearPublishedText);
}

function createPagesDisplay(book, subInfoContainer) {
    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages-div")
    subInfoContainer.appendChild(pagesDiv)

    const pagesHeaderText = document.createElement("h4");
    pagesHeaderText.innerText = "Pages";
    pagesDiv.appendChild(pagesHeaderText);

    const pagesText = document.createElement("p");
    pagesText.innerText = `${book.pages}`;
    pagesDiv.appendChild(pagesText);
}

function createExtraInfoDisplay(book, infoHeader) {
    const subInfoContainer = document.createElement("div");
    subInfoContainer.classList.add("subinfo-container");
    infoHeader.appendChild(subInfoContainer);

    if (book.yearPublished) {
        createYearPublishedDisplay(book, subInfoContainer);
    }

    if (book.pages && book.yearPublished) {
        const infoDivider = document.createElement("div")
        infoDivider.classList.add("info-divider");
        subInfoContainer.appendChild(infoDivider);
    }

    if (book.pages) {
        createPagesDisplay(book, subInfoContainer);
    }
}


function createBookCard(book) {
    const mainCard = document.createElement("div");
    mainCard.classList.add("book-card");
    mainCard.dataset.cardId = book.uniqueID;
    cardContainer.appendChild(mainCard);

    const header = document.createElement("div");
    header.classList.add("card-header");
    mainCard.appendChild(header);

    infoHeader = createMainInfoContainer(book, mainCard);

    createButtons(book, mainCard, header)

    if (book.pages || book.yearPublished) {
        createExtraInfoDisplay(book, infoHeader)
    }
}

function displayBooks() {
    while (cardContainer.hasChildNodes()) {
        cardContainer.removeChild(cardContainer.lastChild);
    }

    for (let book of myLibrary) {
        createBookCard(book);
    }
}


// FORM HANDLING \\

const bookForm = document.querySelector("#add-new-book-form")

function displayValidity(isValid) {
    if (!isValid) {
        let invalidElements = bookForm.querySelectorAll(':invalid');

        invalidElements[0].focus();

        invalidElements.forEach((element) => element.style.outline = "2px solid red")
    }

    let validElements = bookForm.querySelectorAll(':valid');
    validElements.forEach((element) => element.style.outline = "none");
}

document.querySelector("#submit-button").addEventListener("click", (e) => {
    e.preventDefault();

    if (bookForm.checkValidity() == true) {
        displayValidity(true);

        const formData = new FormData(bookForm);
        const bookData = [];

        const title = formData.get("book-title");
        const author = formData.get("author-name");
        const pages = formData.get("pages");
        const year = formData.get("year-published");
        const read = formData.get("finished-book") === "true";

        bookData.push(title);
        bookData.push(author);
        bookData.push(pages ? parseInt(pages) : null);
        bookData.push(year ? parseInt(year) : null);
        bookData.push(read);

        bookForm.reset();

        console.log(bookData);

        addBookToLibrary(bookData);

        displayBooks();
    } else {
        displayValidity(false);
    }
})

addBookToLibrary(["This is a Book I Haven't Read", "This is an Author's Name", 2031, 2025, false]);
addBookToLibrary(["This is a Book I Have Read", "This is an Author's Name", 2031, 2025, true]);

displayBooks();