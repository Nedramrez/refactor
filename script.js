/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const dt = new Date();
document.getElementById('date-time').innerHTML=dt;

class Storage {
  static getBooks() {
    let collection;
    if (localStorage.getItem('collection') === null) {
      collection = [];
    } else {
      collection = JSON.parse(localStorage.getItem('collection'));
    }

    return collection;
  }

  static newBook(book) {
    const collection = Storage.getBooks();
    collection.push(book);
    localStorage.setItem('collection', JSON.stringify(collection));
  }

  static delBook(author) {
    const collection = Storage.getBooks();

    collection.forEach((book, index) => {
      if (book.author === author) {
        collection.splice(index, 1);
      }
    });

    localStorage.setItem('collection', JSON.stringify(collection));
  }
}

class Display {
  static showBooks() {
    const collection = Storage.getBooks();

    collection.forEach((book) => Display.printCollection(book));
  }

  static printCollection(book) {
    const bookList = document.querySelector('#books-list');

    const tableRow = document.createElement('tr');
    const dataCell = document.createElement('td');
    const dataCell2 = document.createElement('td');
    const button = document.createElement('button');
    dataCell.innerHTML = ` <span>"${book.title}"</span> by <span>${book.author}</span> `;
    tableRow.append(dataCell);
    tableRow.append(dataCell2);
    dataCell2.append(button);
    button.classList.add('delete');
    button.innerText = 'Remove';
    bookList.appendChild(tableRow);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

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

