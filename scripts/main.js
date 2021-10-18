function createMyElement(para) {
  return document.createElement(para);
}

function getMyElement(para) {
  return document.querySelector(para);
}

const addBookForm = getMyElement('form');
const bookTitle = getMyElement('#title-id');
const bookAuthor = getMyElement('#author-id');

let bookArray = [
  {
    title: 'Red Line',
    author: 'Eapen',
  },
  {
    title: 'Yellow Line',
    author: 'Michael',
  },
];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(e) {
  e.preventDefault();
  let newBook = new Book(bookTitle.value, bookAuthor.value);
  bookArray.push(newBook);
}

addBookForm.addEventListener('submit', addBook);

function showBook() {
  bookArray.forEach((book) => {
    console.log(book);
  });
}


showBook();