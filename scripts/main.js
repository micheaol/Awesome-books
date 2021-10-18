function createMyElement(para) {
  return document.createElement(para);
}

function getMyElement(para) {
  return document.querySelector(para);
}

const addBookForm = getMyElement('form');
const bookTitle = getMyElement('#title-id');
const bookAuthor = getMyElement('#author-id');

let bookArray = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(e) {
  e.preventDefault();
  let newBook = new Book(bookTitle.value, bookAuthor.value);
  console.log(bookTitle.value);
  bookArray.push(newBook);
}

addBookForm.addEventListener('submit', addBook);
