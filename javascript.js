const myLibrary = [];

function Book (title, author, pages, read, yearPublished) {
  if (!new.target) {
    throw Error("Must use the new operator to call the consturctor!");
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.yearPublished = yearPublished
  this.uniqueID = crypto.randomUUID();
  
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
}

function addBookToLibrary(title, author, pages, read, yearPublished) {
    myLibrary.push(new  Book(title, author, pages, read, yearPublished));
}

addBookToLibrary("Cool book!", "Dr. Cool Author, PhD", "199", false, 2024);
addBookToLibrary("Random book...", "Random Author", "21542", true, 1996);

function createBookCard(book) {
    const cardContainer = document.querySelector(".card-container");

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
    for (let book of myLibrary) {
        createBookCard(book);
    }
}

displayBooks();