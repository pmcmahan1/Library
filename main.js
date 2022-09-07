// Book Class: Represents a Book
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#bookList');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
            <td><a href="#" class="delete">X</a></td>
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
        document.querySelector('#pages').value = '';
    }
}

// Store Class: Handles LocalStorage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(status) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.status === status) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}



// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#bookForm').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;

    // Validate
    if(title === '' || author === '' || pages === '') {
        alert('Please fill in all fields');
    } else {

    // Instantiate Book
    const book = new Book(title, author, pages, status);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to LocalStorage
    Store.addBook(book);

    // Clear fields after submit
    UI.clearFields();
    }

});

// Event: Remove a Book
document.querySelector('#bookList').addEventListener('click', (e) =>
{
    // Remove book from UI
    UI.deleteBook(e.target)

    // Remove book from LocalStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});