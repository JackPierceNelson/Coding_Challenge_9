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