const myLibrary = [];

function Book (bookData) {
  if (!new.target) {
    throw Error("Must use the new operator to call the consturctor!");
  }
  
  this.title = bookData[0];
  this.author = bookData[1];
  this.pages = bookData[2];
  this.yearPublished = bookData[3];
  this.read = bookData[4];

  this.uniqueID = crypto.randomUUID();
  
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
}

function addBookToLibrary(title, author, pages, read, yearPublished) {
    myLibrary.push(new  Book(title, author, pages, read, yearPublished));
}

const cardContainer = document.querySelector(".card-container");

function createBookCard(book) {
    const mainCard = document.createElement("div");
    mainCard.classList.add("book-card");
    cardContainer.appendChild(mainCard);

    const highlight = document.createElement("div");
    highlight.classList.add("highlight");
    mainCard.appendChild(highlight);
    
    // DATA DISPAY ELEMENTS

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


    // EXTRA INFO DATA DISPLAY

    if (book.pages || book.yearPublished) {
        const divider = document.createElement("div")
        divider.classList.add("divider");
        infoHeader.appendChild(divider);
        
        const subInfoContainer = document.createElement("div");
        subInfoContainer.classList.add("subinfo-container");
        infoHeader.appendChild(subInfoContainer);

        // const infoDivider = document.createElement("div")
        // infoDivider.classList.add("info-divider");
        // subInfoContainer.appendChild(infoDivider);

        if (book.yearPublished) {
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

        if (book.pages) {
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

const bookForm = document.querySelector("#add-new-book-form")

document.querySelector("#submit-button").addEventListener("click", (e) => {
    e.preventDefault();

    if (bookForm.checkValidity() == false) {
        console.log("missing elements");
    }

    const formData = new FormData(bookForm);
    const bookData = [];

    for (const [key,value] of formData) {
        bookData.push(value);
    }

    bookForm.reset();

    addBookToLibrary(bookData);

    displayBooks();
})

addBookToLibrary(["This is a Book Title", "This is an Author's Name", 2031, 2025, false]);
addBookToLibrary(["This is a Book Title", "This is an Author's Name", 2031, 2025, false]);

displayBooks();