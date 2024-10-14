// Task 1: Create a Book Class

class Book {
    constructor(title, author, ISBN, _isAvailable) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = _isAvailable;
    }

    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.ISBN}`;
    }

    get isAvailable() {
        return this._isAvailable;
    }

    set isAvailable(status) {
        this._isAvailable = status;
    }
}

const myBook = new Book("Star Wars", "George Lucas", 1234, true);
console.log(myBook.getDetails());
console.log(myBook.isAvailable);

// Task 2: Create a Section Class

class Section {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        }
        else {console.log("Error: Cannot add book objects");}
    }

    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    }
    listBooks() {
        return this.books.map(book => {return `${book.title} - ${book.isAvailable? 'Available': 'Borrowed'}`;})
    }
}

const fictionSection = new Section("Fiction");
const book1 = new Book("Star Wars Episode I", "Author: George Lucas", "ISBN: 2345");
fictionSection.addBook(book1);
console.log(fictionSection.listBooks());
console.log(fictionSection.getAvailableBooks());