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
    let bookDiv = createMyElement("div");
    bookDiv.className = 'book';
    let bookTitle = createMyElement("h3");
    bookTitle.textContent = book.title;
    let bookAuthor = createMyElement('p');
    bookAuthor.textContent = book.author;
    let removeBtn = createMyElement('button');
    removeBtn.type = 'button';
    removeBtn.id = book.title;
    removeBtn.textContent = 'Remove';
    let seperator = createMyElement('hr');
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(seperator);
    bookParent.prepend(bookDiv);
  });
}


showBook();