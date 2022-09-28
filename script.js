class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

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
    const list = document.querySelector('#books-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td id="col1">"${book.title}" by</td>
      <td id="col2">${book.author}</td>
      <td id="col3"><a href="#" class="delete">Remove</a></td>
    `;

    list.appendChild(row);
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

  Storage.delBook(e.target.parentElement.previousElementSibling.textContent);
});