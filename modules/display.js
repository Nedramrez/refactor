export default
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
