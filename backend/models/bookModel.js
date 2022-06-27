const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book: {
        type: String,
        maxLength: 30
    },
    category: {
        type: String,
        maxLength: 20
    }
});

const Book = new mongoose.model("Book", bookSchema);

// Duomenų siuntimas į DB
// const addBook = new Book({

//     book: "Grybu karas",
//     category: "drama"

// });

// addBook.save();

module.exports = Book;