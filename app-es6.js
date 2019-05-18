class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // Get the table body id
    const list = document.querySelector("#book-list");

    // Create the row element
    const row = document.createElement("tr");

    // Add the book to the row
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete"><i class="fa fa-times"></i></a></td>
  `;

    // console.log(row);

    // Append the row to the list
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create the div element
    const div = document.createElement("div");

    // Add the className to the div
    div.className = `alert ${className}`;

    // Add the text
    div.appendChild(document.createTextNode(message));

    // Get the parent
    const container = document.querySelector(".container");

    // Get the form
    const form = document.querySelector("#book-form");

    // Insert the Alert
    container.insertBefore(div, form);

    // Timeout func to clear the alert
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    // console.log(target);
    if (target.className === "fa fa-times")
      target.parentElement.parentElement.parentElement.remove();
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

class Store {
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    // console.log(books);

    books.forEach(function(book) {
      const ui = new UI();

      //   Add book to the UI
      ui.addBookToList(book);
    });
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    // console.log(books);

    books.forEach(function(book, index) {
        if(book.isbn === isbn)
            books.splice(index, 1);
    });    

    localStorage.setItem('books', JSON.stringify(books));

  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listeners for the Add book
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

  console.log(ui);

  // Validate the fields
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    // Add book to the list
    ui.addBookToList(book);

    // Add Book to the LS
    Store.addBook(book);

    // Success Alert
    ui.showAlert("Book Added Successfully", "success");

    // Clear the fields
    ui.clearFields();

    // Focus the Title Field
    document.querySelector("#title").focus();
  }

  e.preventDefault();
});

// Event Listeners for the Delete book
document.querySelector("#book-list").addEventListener("click", function(e) {
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Remove Book from the LS
  Store.removeBook(
    e.target.parentElement.parentElement.previousElementSibling.textContent
  );

  // console.log(e.target.parentElement.parentElement.previousElementSibling.textContent);

  // Show Success - Alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
