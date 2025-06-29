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

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    mainCard.appendChild(infoContainer);

    const titleText = document.createElement("h2");
    titleText.innerText = book.title;
    infoContainer.appendChild(titleText);

    const authorText = document.createElement("h3");
    authorText.innerText = book.author;
    infoContainer.appendChild(authorText);

    const divider = document.createElement("div")
    divider.classList.add("divider");
    infoContainer.appendChild(divider);

    const subinfoContainer = document.createElement("div");
    subinfoContainer.classList.add("subinfo-container");
    infoContainer.appendChild(subinfoContainer);

    const pagesText = document.createElement("p");
    pagesText.innerText = `${book.pages} pages`;
    subinfoContainer.appendChild(pagesText);

    const infoDivider = document.createElement("div")
    infoDivider.classList.add("info-divider");
    subinfoContainer.appendChild(infoDivider);

    const yearPublishedText = document.createElement("p");
    yearPublishedText.innerText = `${book.yearPublished}`;
    subinfoContainer.appendChild(yearPublishedText);
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

    const formData = new FormData(bookForm);
    const bookData = [];

    for (const [key,value] of formData) {
        bookData.push(value);
    }

    bookForm.reset();

    addBookToLibrary(bookData);

    displayBooks();
})