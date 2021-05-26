// const submit = document.getElementById('submit');

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
      .indexOf(aNewBook.title);
    myLibrary.splice(bookIndex, 1);
    // remove book from local storage
    localStorage.removeItem(bookIndex);
  });
}





    