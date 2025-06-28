const myLibrary = [];

function Book (title, author, pages, read) {
  if (!new.target) {
    throw Error("Must use the new operator to call the consturctor!");
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uniqueID = crypto.randomUUID();
  
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new  Book(title, author, pages, read));
}

addBookToLibrary("Cool book!", "He Who Shall Not Be Named", "199", false);
addBookToLibrary("Random book...", "Random Author", "21542", true);

function displayBooks() {
    for (let book of myLibrary) {
        console.log(book);
    }
}

displayBooks();