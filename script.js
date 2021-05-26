// const submit = document.getElementById('submit');

const myLibrary = [];

function newBook(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

function addBookToLibrary(aNewBook) {
  myLibrary.push(aNewBook);
}

function renderBook(aNewBook){
    
}


  