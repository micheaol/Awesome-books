function createMyElement(para) {
  return document.createElement(para);
}

function getMyElement(para) {
  return document.querySelector(para);
}

const addBookForm = getMyElement('form');
const bookTitle = getMyElement('#title-id');
const bookAuthor = getMyElement('#author-id');
const bookParent = getMyElement('.books');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  removeBook() {
    const key = `${this.title} + ${this.author}`;
    localStorage.removeItem(key);
  }
}
/* eslint max-classes-per-file: ["error", 2] */

class Books {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    return book;
  }
}

const newBook = new Books();

function saveLocalStorage() {
  const key = `${bookTitle.value} + ${bookAuthor.value}`;
  localStorage.setItem(key, JSON.stringify(newBook));
}

function addBook(e) {
  e.preventDefault();
  newBook.addBook(bookTitle.value, bookAuthor.value);
  saveLocalStorage();
  window.location.reload();
}

addBookForm.addEventListener('submit', addBook);

function showBook() {
  Object.keys(localStorage).forEach((key) => {
    const dataFromLoca = JSON.parse(localStorage.getItem(key));
    if (dataFromLoca.books) {
      dataFromLoca.books.forEach((book) => {
        const bookDiv = createMyElement('div');
        bookDiv.className = 'book';
        const bookContent = createMyElement('p');
        bookContent.textContent = `${book.title} by ${book.author}`;
        const removeBtn = createMyElement('button');
        removeBtn.type = 'button';
        removeBtn.id = book.title;
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', (e) => {
          const bookDel = new Book(book.title, book.author);
          bookDel.removeBook();
          e.target.parentNode.remove();
        });
        const seperator = createMyElement('hr');
        bookDiv.appendChild(bookContent);
        bookDiv.appendChild(removeBtn);
        bookDiv.appendChild(seperator);
        bookParent.prepend(bookDiv);
      });
    }
  });
}

showBook();
