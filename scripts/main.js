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

  addBook() {
    const key = `${bookTitle.value} + ${bookAuthor.value}`;
    const book = [this.title, this.author];
    localStorage.setItem(key, JSON.stringify(book));
  }

  removeBook() {
    const key = `${this.title} + ${this.author}`;
    localStorage.removeItem(key);
  }
}

let newBook = new Book();

function printBook(book) {
  const bookDiv = createMyElement('div');
  bookDiv.className = 'book';
  const bookContent = createMyElement('p');
  bookContent.textContent = `${book[0]} by ${book[1]}`;
  const removeBtn = createMyElement('button');
  removeBtn.type = 'button';
  removeBtn.id = book[0] + book[1];
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', (e) => {
    const bookDel = new Book(book[0], book[1]);
    bookDel.removeBook();
    e.target.parentNode.remove();
  });
  const seperator = createMyElement('hr');
  bookDiv.appendChild(bookContent);
  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(seperator);
  bookParent.prepend(bookDiv);
}

function addBook(e) {
  e.preventDefault();
  newBook = new Book(bookTitle.value, bookAuthor.value);
  newBook.addBook();
  printBook([bookTitle.value, bookAuthor.value]);
}

addBookForm.addEventListener('submit', addBook);

function showBook() {
  Object.keys(localStorage).forEach((key) => {
    const book = JSON.parse(localStorage.getItem(key));
    if (book) {
      printBook(book);
    }
  });
}

showBook();