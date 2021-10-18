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

let bookArray = [
];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function saveLocalStorage() {
  let key = `${bookTitle.value} + ${bookAuthor.value}`;
  localStorage.setItem(key, JSON.stringify(bookArray));
}

function addBook(e) {
  e.preventDefault();
  let newBook = new Book(bookTitle.value, bookAuthor.value);
  bookArray.push(newBook);
  saveLocalStorage();
  location.reload();
}

addBookForm.addEventListener('submit', addBook);

function showBook() {
  for (key in localStorage) {
    const dataFromLoca = JSON.parse(localStorage.getItem(key));
    if (dataFromLoca) {
      dataFromLoca.forEach((book) => {
        let bookDiv = createMyElement('div');
        bookDiv.className = 'book';
        let bookTitle = createMyElement('h3');
        bookTitle.textContent = book.title;
        let bookAuthor = createMyElement('p');
        bookAuthor.textContent = book.author;
        let removeBtn = createMyElement('button');
        removeBtn.type = 'button';
        removeBtn.id = book.title;
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', (e) => {
          let key = `${bookTitle.textContent} + ${bookAuthor.textContent}`;
          console.log(key);
          localStorage.removeItem(key);
          e.target.parentNode.remove();
        })
        let seperator = createMyElement('hr');
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(removeBtn);
        bookDiv.appendChild(seperator);
        bookParent.prepend(bookDiv);
      });
    }
  }
}

showBook();
