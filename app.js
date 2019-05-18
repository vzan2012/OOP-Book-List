// ES-5 Script Code

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to the list
UI.prototype.addBookToList = function(book) {
  // Get the table body id
  const list = document.querySelector("#book-list");

  // Create the row element
  const row = document.createElement("tr");

  // Add the book to the row
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>
  `;

  console.log(row);

  // Append the row to the list
  list.appendChild(row);
};

// Clear the Fields
UI.prototype.clearFields = function() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// Event Listeners
document.querySelector("#book-form").addEventListener("submit", function(e) {
  // Getting the form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // console.log(title, author, isbn);

  // Instantiate Book object
  const book = new Book(title, author, isbn);

  // Instantiate UI Object
  const ui = new UI();

  // Add book to the list
  ui.addBookToList(book);

  // Clear the fields
  ui.clearFields();

  e.preventDefault();
});
