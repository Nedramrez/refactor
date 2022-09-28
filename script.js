// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Display Class: Handle Display Tasks
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
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Storage Class: Handles Storage
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
      if(book.author === author) {
        collection.splice(index, 1);
      }
    });

    localStorage.setItem('collection', JSON.stringify(collection));
  }
}

// Event: Display collection
document.addEventListener('DOMContentLoaded', Display.showBooks);

// Event: Add a Book
document.querySelector('#form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if(title === '' || author === '') {
    Display.showAlert('Enter valid values for title and author fields, please.');
  } else {
    // Instatiate book
    const book = new Book(title, author);

    // Add Book to Display
    Display.printCollection(book);

    // Add book to Storage
    Storage.newBook(book);

    // Clear fields
    Display.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#books-list').addEventListener('click', (e) => {
  // Remove book from Display
  Display.deleteBook(e.target);

  // Remove book from Storage
  Storage.delBook(e.target.parentElement.previousElementSibling.textContent);
});