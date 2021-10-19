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

const bookArray = [];

// function Book(title, author) {
//   this.title = title;
//   this.author = author;
// }

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Books {
  constructor() {
    this.books = [];
  }
  addBook(title, author) {
    let book = new Book(title, author);
    this.books.push(book);
    return book;
  }
  
}
const newBook = new Books();
console.log(newBook);

function saveLocalStorage() {
  const key = `${bookTitle.value} + ${bookAuthor.value}`;
  localStorage.setItem(key, JSON.stringify(newBook));
}

function addBook(e) {
  e.preventDefault();
  newBook.addBook(bookTitle.value, bookAuthor.value);
  //bookArray.push(newBook);
  saveLocalStorage();
  window.location.reload();
}

addBookForm.addEventListener('submit', addBook);

function showBook() {
  Object.keys(localStorage).forEach((key) => {
    const dataFromLoca = JSON.parse(localStorage.getItem(key));
    console.log(dataFromLoca.books);
    if (dataFromLoca.books) {
      dataFromLoca.books.forEach(book => {
        console.log(book);
        const bookDiv = createMyElement('div');
        bookDiv.className = 'book';
        const bookTitle = createMyElement('h3');
        bookTitle.textContent = book.title;
        const bookAuthor = createMyElement('p');
        bookAuthor.textContent = book.author;
        const removeBtn = createMyElement('button');
        removeBtn.type = 'button';
        removeBtn.id = book.title;
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', (e) => {
          const key = `${bookTitle.textContent} + ${bookAuthor.textContent}`;
          localStorage.removeItem(key);
          e.target.parentNode.remove();
        });
        const seperator = createMyElement('hr');
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(removeBtn);
        bookDiv.appendChild(seperator);
        bookParent.prepend(bookDiv);
      });
    }
  });
}

showBook();