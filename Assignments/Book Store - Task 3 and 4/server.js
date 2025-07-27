const express = require("express");
const fs = require("fs");

const app = express();

// Middleware
app.use(express.json());

// Geeting all the books
app.get("/books", (req, res) => {
    fs.readFile("books.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let readableData = JSON.parse(data);
        if (readableData.length <= 0) {
            res.send({
                message: "No books found",
                description: "There's no book at the moment"
            })
        } else {
            res.send({
                message: "All Books",
                books: readableData,
            })
        }

    });
});

// Geeting all the books
app.get("/books/:id", (req, res) => {
    let targetId = req.params.id;
    fs.readFile("books.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let readableData = JSON.parse(data);
        let matchedResults = readableData.find(book => book.id == targetId)
        if (readableData.length <= 0) {
            res.send({
                message: "No books found",
                description: "There's no book at the moment"
            })
        } else {
            res.send({
                message: "All Books",
                books: matchedResults,
            })
        }

    });
});

// Posting/Creating new book


// Server 
const PORT = 3070;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});