// Task 1: Create a Book Class

// Defined the Book class with a constructor that takes title, author, ISBN, and availability
class Book {
    constructor(title, author, ISBN, _isAvailable) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = _isAvailable;
    }

    // getDetails method returns a string containing title, author, and ISBN of the book
    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.ISBN}`;
    }

    // Used a getter for isAvailable that returns the value of _isAvailable
    get isAvailable() {
        return this._isAvailable;
    }

    // Used a setter for isAvailable to update the availability status of the book
    set isAvailable(status) {
        this._isAvailable = status;
    }
}

// Test case
const myBook = new Book("Star Wars", "George Lucas", 1234, true);
console.log(myBook.getDetails());
console.log(myBook.isAvailable);

// Task 2: Create a Section Class

// Defined class section with constructor name as parameter as well as name as property and books as an empty array
class Section {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    
    // addBook method checks if the argument is an instance of the Book class, if not, it logs an error
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        }
        else {console.log("Error: Cannot add book objects");}
    }

    // Used the filter method to create an array of all available and borrowed books
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    }

    // Used the map method to create an array of strings each representing a book
    listBooks() {
        return this.books.map(book => {return `${book.title} - ${book.isAvailable? 'Available': 'Borrowed'}`;})
    }
}

// Test case
const fictionSection = new Section("Fiction");
const book1 = new Book("Star Wars Episode I", "Author: George Lucas", "ISBN: 2345");
fictionSection.addBook(book1);
console.log(fictionSection.listBooks());
console.log(fictionSection.getAvailableBooks());

// Task 3: Create a Patron Class

class Patron {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }
    borrowBook(book) {
        if (book instanceof Book) {
            if (book.isAvailable) {
                book.isAvailable = false;
                this.borrowedBooks.push(book);
                console.log(`${this.name} Has succesfully borrowed ${book.title}`);
            }
            else {
                console.log(`${book.title} is not available.`);
            }
        }
    }

    returnBook(book) {
        if (book instanceof Book) {
            const initialLength = this.borrowedBooks.length;
            this.borrowedBooks = this.borrowedBooks.filter(b => b.ISBN !== book.ISBN);
            if (this.borrowedBooks.length < initialLength) {
                book.isAvailable = true;
                console.log(`${this.name} has succesfully returned ${book.title}.`);
            }
            else {
                console.log(`Error: ${book.title} was not borrowed.`);
            }
        }
    }
}

const patron = new Patron("Jack");
const book2 = new Book("Killer App", "Author: Chunka", "ISBN: 87584");
patron.borrowBook(book2);
patron.returnBook(book1);