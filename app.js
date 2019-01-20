
const Book = function (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

const UI = function () { };

UI.prototype.addBookToUI = function (book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td class="remove">X</td>`;
  list.appendChild(row);
}

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function (message, className) {
  const div = document.getElementById('alert');
  div.className = `alert ${className}`;
  div.textContent = message;
}

UI.prototype.removeBook = function (target, ui) {
  if (target.className === 'remove') {
    document.getElementById('alert').style.display = 'block';
    ui.showAlert('Book removed', 'warning')
    target.parentElement.remove();

    setTimeout(() => {
      document.getElementById('alert').style.display = 'none';
    }, 3000)
  }
}

document.getElementById('book-form').addEventListener('submit', addBook);

function addBook(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  document.getElementById('alert').style.display = 'block';

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all fields', 'error')

    setTimeout(() => {
      document.getElementById('alert').style.display = 'none';
    }, 3000)

  } else {
    ui.showAlert('Book added', 'success');
    setTimeout(() => {
      document.getElementById('alert').style.display = 'none';
    }, 3000);

    ui.addBookToUI(book);
    ui.clearFields();
  }
  e.preventDefault();
}

document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.removeBook(e.target, ui);
})