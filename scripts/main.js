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
let lastKey = 1000;

class Book {
  constructor(title, author, key) {
    this.title = title;
    this.author = author;
    this.key = key;
  }

  addBook() {
    const book = [this.title, this.author];
    localStorage.setItem(this.key, JSON.stringify(book));
  }

  removeBook() {
    localStorage.removeItem(this.key);
  }
}

let newBook = new Book();

function printBook(book, key) {
  const bookDiv = createMyElement('div');
  bookDiv.className = 'book';
  const bookContent = createMyElement('p');
  bookContent.textContent = `${book[0]} by ${book[1]}`;
  const removeBtn = createMyElement('button');
  removeBtn.type = 'button';
  removeBtn.id = book[0] + book[1];
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', (e) => {
    const bookDel = new Book(book[0], book[1], key);
    bookDel.removeBook();
    if (localStorage.length === 0) {
      bookParent.innerHTML = '<div class="book">Library Is Empty!</div>';
    }
    e.target.parentNode.remove();
  });
  const seperator = createMyElement('hr');
  bookDiv.appendChild(bookContent);
  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(seperator);
  bookParent.prepend(bookDiv);
}

function showBook() {
  if (localStorage.length !== 0) {
    bookParent.innerText = '';
    const bookKeys = [];
    Object.keys(localStorage).forEach((key) => {
      bookKeys.push(Number(key));
    });
    bookKeys.sort().forEach((key) => {
      const book = JSON.parse(localStorage.getItem(key));
      if (book) {
        if (lastKey <= Number(key)) lastKey = Number(key);
        printBook(book, Number(key));
      }
    });
  }
}

function addBook(e) {
  e.preventDefault();
  lastKey += 1;
  newBook = new Book(bookTitle.value, bookAuthor.value, lastKey);
  bookTitle.value = '';
  bookAuthor.value = '';
  newBook.addBook();
  showBook();
}

addBookForm.addEventListener('submit', addBook);

showBook();