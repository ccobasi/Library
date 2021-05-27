const submit = document.getElementById('submit');

const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function displayBook(newBook){
    const bookRow = document.querySelector('.book-row');
    const card = document.querySelector('.book-col').cloneNode(true);
    card.classList.remove('d-none');

    card.querySelector('.card-header').textContent = newBook.title;
    card.querySelector('.card-title').textContent = newBook.author;
    card.querySelector('.card-text').textContent = newBook.pages;
    document.querySelector('.book-row').appendChild(card);

// change book status
const readUnreadBtn = card.querySelector('#unread');

  if (newBook.read === true) {
    readUnreadBtn.textContent = 'Read';
    readUnreadBtn.classList.remove('btn-warning');
    readUnreadBtn.classList.add('btn-success');
  } else {
    readUnreadBtn.textContent = 'Unread';
    readUnreadBtn.classList.remove('btn-success');
    readUnreadBtn.classList.add('btn-warning');
  }

  readUnreadBtn.addEventListener('click', () => {
    if (newBook.read === false) {
      newBook.read = true;
      readUnreadBtn.textContent = 'Read';
      readUnreadBtn.classList.remove('btn-warning');
      readUnreadBtn.classList.add('btn-success');
    } else {
      newBook.read = false;
      readUnreadBtn.textContent = 'Unread';
      readUnreadBtn.classList.remove('btn-success');
      readUnreadBtn.classList.add('btn-warning');
    }
    const bookIndex = myLibrary
      .map((book) => book.title)
      .indexOf(newBook.title);
    // update book read state in local storage
    localStorage.setItem(bookIndex.toString(), JSON.stringify(newBook));
  });

  // remove button
  const removeBtn = card.querySelector('#remove');
  // removes from view
  removeBtn.addEventListener('click', () => {
    bookRow.removeChild(card);
    // removes from array
    const bookIndex = myLibrary
      .map((book) => book.title)
      .indexOf(newBook.title);
    myLibrary.splice(bookIndex, 1);
    // remove book from local storage
    localStorage.removeItem(bookIndex);
  });
}

function createNewBookFromLocalStorage(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBook(newBook);
}

// loads previous added books
window.onload = function () {
    for (let i = 0; i < localStorage.length; i += 1) {
      const retrievedObject = localStorage.getItem(i);
      const newBookObj = JSON.parse(retrievedObject);
      createNewBookFromLocalStorage(
        newBookObj.title,
        newBookObj.author,
        newBookObj.pages,
        newBookObj.read,
      );
}
};

function createNewBook(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
  
    e.preventDefault();
  
    function validateForm(title, author, pages) {
      let newBook;
      if (title === '' || author === '' || pages === '') {
        alert('please fill all the form');
      } else {
        newBook = new Book(title, author, pages);
        addBookToLibrary(newBook);
  
        const bookObj = {
          title: newBook.title,
          author: newBook.author,
          pages: newBook.pages,
          read: newBook.read,
        };
  
        // Put the object into storage...
        const bookIndex = localStorage.length === 0 ? 0 : localStorage.length;
        localStorage.setItem(bookIndex.toString(), JSON.stringify(bookObj));
  
        const form = document.getElementById('form');
        form.reset();
        displayBook(newBook);
      }
    }
    validateForm(title, author, pages);
  }
  
  submit.addEventListener('click', (e) => createNewBook(e));


 