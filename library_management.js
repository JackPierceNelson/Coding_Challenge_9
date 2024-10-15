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

// Defined the Patron class with a constructor name as parameter
class Patron {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = [];
    }
    // The borrowBook method checks if the argument book is an instance of the book class
    borrowBook(book) {
        if (book instanceof Book) {
            // If it is a book and isAvailable, set the availability to false and add it to the borrowedBooks Array
            if (book.isAvailable) {
                book.isAvailable = false;
                this.borrowedBooks.push(book);
                console.log(`${this.name} Has succesfully borrowed ${book.title}.`);
            }
            // If the book is not available, it logs a message
            else {
                console.log(`${book.title} is not available.`);
            }
        }
        else {
            console.log("Error: Can only borrow book objects.");
        }
    }

    // The returnBook method checks if the book is an instance of Book
    returnBook(book) {
        if (book instanceof Book) {
            // Stored the initial length of the borrowedBooks array
            const initialLength = this.borrowedBooks.length;
            // Used filter to create an new array that excludes the book being returned
            this.borrowedBooks = this.borrowedBooks.filter(b => b.ISBN !== book.ISBN);
            // Compared the new lengthed of borrowedBooks with initialLength, if it is smaller, it means the book was found and removed
            if (this.borrowedBooks.length < initialLength) {
                book.isAvailable = true;
                console.log(`${this.name} has succesfully returned ${book.title}.`);
            }
            else {
                console.log(`Error: ${book.title} was not borrowed.`);
            }
        }
        else {
            console.log("Error: Can only return book objects.");
        }
    }
}
// Test case
const patron = new Patron("Jack");
const book2 = new Book("Killer App", "Author: Chunka", "ISBN: 87584");
patron.borrowBook(book2);
patron.returnBook(book1);

// Task 4: Create a VIPPatron Class that Inherits from Patron

class VIPPatron extends Patron {
    constructor(name) {
        super(name);
        this.priority = true;
    }
    borrowBook(book) {
        if (book instanceof Book) {
            // If it is a book and isAvailable, set the availability to false and add it to the borrowedBooks Array
            if (book.isAvailable) {
                book.isAvailable = false;
                this.borrowedBooks.push(book);
                console.log(`VIP Patron: ${this.name} Has succesfully borrowed ${book.title}`);
            }
            else {
                const currentBorrower = this.findCurrentBorrower(book);
                if (currentBorrower && !(currentBorrower instanceof VIPPatron)) {
                    currentBorrower.returnBook(book);
                    this.borrowedBooks.push(book);
                    book.isAvailable = false;
                    console.log(`VIP Patron ${this.name} has succesfully borrowed ${book.title} with priority.`);
                }
            
            // If the book is not available, it logs a message
            else {
                console.log(`${book.title} is not available.`);
            }
        }
    }
}
findCurrentBorrower(book) {
    return null;
}
}

const nonVIP_patron = new Patron("Bob");
const VIP_patron = new VIPPatron("Sam");
const book3 = new Book("Star Wars Episode II", "Author: George Lucas", "ISBN: 5678");
const book4 = new Book("Star Wars Episode III", "Author: George Lucas", "ISBN: 8678");

nonVIP_patron.borrowBook(book3);
VIP_patron.borrowBook(book4);


