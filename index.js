import Book from './modules/book.js';
import Display from './modules/display.js';
import Storage from './modules/storage.js';

const dt = new Date();
document.getElementById('date-time').innerHTML = dt;
document.addEventListener('DOMContentLoaded', Display.showBooks);

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    Display.showAlert('Enter valid values for title and author fields, please.');
  } else {
    const book = new Book(title, author);

    Display.printCollection(book);

    Storage.newBook(book);

    Display.clearFields();
  }
});

document.querySelector('#books-list').addEventListener('click', (e) => {
  Display.deleteBook(e.target);
  Storage.delBook(e.target.parentElement.previousElementSibling.lastElementChild.textContent);
});

function addButton() {
  const addPage = document.getElementById('addPage');
  addPage.style.display = 'flex';
  const contactPage = document.getElementById('contactPage');
  contactPage.style.display = 'none';
  const listPage = document.getElementById('listPage');
  listPage.style.display = 'none';
}

const addBtn = document.querySelector('#add-new');
addBtn.addEventListener('click', addButton);

function listButton() {
  const addPage = document.getElementById('addPage');
  addPage.style.display = 'none';
  const contactPage = document.getElementById('contactPage');
  contactPage.style.display = 'none';
  const listPage = document.getElementById('listPage');
  listPage.style.display = 'block';
}

const listBtn = document.querySelector('#list');
listBtn.addEventListener('click', listButton);

function contactButton() {
  const addPage = document.getElementById('addPage');
  addPage.style.display = 'none';
  const contactPage = document.getElementById('contactPage');
  contactPage.style.display = 'flex';
  const listPage = document.getElementById('listPage');
  listPage.style.display = 'none';
}

const contactBtn = document.querySelector('#contact');
contactBtn.addEventListener('click', contactButton);
