function createMyElement(para) {
  return document.createElement(para);
}

function getMyElement(para) {
  return document.querySelector(para);
}

const bookTitle = getMyElement('#title-id');
const bookAuthor = getMyElement('#author-id');
const bookParent = getMyElement('#books');
const addBookForm = getMyElement('#add-form');
const contactPage = getMyElement('#contact');
const listBtn = getMyElement('#list-btn');
const formBtn = getMyElement('#form-btn');
const contactBtn = getMyElement('#contact-btn');

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

function showPage(page) {
  console.log(page);
  switch (page) {
    case 1:
      bookParent.style.display = 'flex';
      addBookForm.style.display = 'none';
      contactPage.style.display = 'none';
      listBtn.style.color = '#0066ff';
      formBtn.style.color = 'black';
      contactBtn.style.color = 'black';
      break;
    case 2:
      bookParent.style.display = 'none';
      addBookForm.style.display = 'flex';
      contactPage.style.display = 'none';
      listBtn.style.color = 'black';
      formBtn.style.color = '#0066ff';
      contactBtn.style.color = 'black';
      break;
    case 3:
      bookParent.style.display = 'none';
      addBookForm.style.display = 'none';
      contactPage.style.display = 'block';
      listBtn.style.color = 'black';
      formBtn.style.color = 'black';
      contactBtn.style.color = '#0066ff';
      break;
    default:
      bookParent.style.display = 'flex';
      addBookForm.style.display = 'none';
      contactPage.style.display = 'none';
      break;
  }
}

addBookForm.addEventListener('submit', addBook);

listBtn.onclick = function() { showPage(1); };
formBtn.onclick = function() { showPage(2); };
contactBtn.onclick = function() { showPage(3); };

bookParent.style.display = 'flex';
addBookForm.style.display = 'none';
contactPage.style.display = 'none';
listBtn.style.color = '#0066ff';

showBook();