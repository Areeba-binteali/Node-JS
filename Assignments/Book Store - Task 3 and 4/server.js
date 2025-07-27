const express = require("express");
const fs = require("fs");

const app = express();

// Middleware
app.use(express.json());

// Geeting all the books
app.get("/books", (req, res) => {
    let filterByAuthor = req.query.author;
    let minPrice = parseFloat(req.query.minPrice);
    let maxPrice = parseFloat(req.query. maxPrice);
    let genre = req.query.genre;
    fs.readFile("books.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let readableData = JSON.parse(data); 
        if (filterByAuthor){
            let matchedResult = readableData.filter(auth => auth.author.toLowerCase().includes(filterByAuthor.toLowerCase()));
            return res.send({
                message: `Showing results for ${filterByAuthor}`,
                books: matchedResult,
            });
        }
        if (!isNaN(minPrice) && !isNaN(maxPrice)){
            let matchedResult = readableData.filter(prc => prc.price >= minPrice && prc.price <= maxPrice);
            return res.send({
                message: "Matched Results",
                books: matchedResult
            })
        }
        if(genre){
            let matchedResult = readableData.filter(gen => gen.genre.toLowerCase().includes(genre.toLowerCase()));
            return res.send({
                message: `Books related to ${genre}`,
                books: matchedResult,
            })
        }
        if (readableData.length <= 0) {
            return res.send({
                message: "No books found",
                description: "There's no book at the moment"
            })
        } else {
            return res.send({
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
app.post("/books", (req, res) => {
    let newData = req.body;
    fs.readFile("books.json", "utf-8", (err, data) => {
        let formattedData = JSON.parse(data);
        let newId = formattedData.length > 0 ? Math.max(...formattedData.map(book => book.id)) + 1 : 0;
        let newBook = {
            id: newId,
            title: newData.title,
            author: newData.author,
            genre: newData.genre,
            price: newData.price
        }
        formattedData.push(newBook);
        const dataSentToFile = JSON.stringify(formattedData, null, 6);
        fs.writeFile("books.json", dataSentToFile, (err) => {
            if (err) {
                console.log(err)
            }
            res.send({
                message: "Book added successfully",
                books: formattedData,
            })
        });
    });
});

// updating the whole book using put
app.put("/books/:id", (req, res) => {
    const targetId = req.params.id;
    const newData = req.body;
    fs.readFile("books.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let formattedData = JSON.parse(data);
        let updatedBook = formattedData.map(book => {
            if (book.id == targetId) {
                return {
                    ...book,
                    title: newData.title,
                    author: newData.author,
                    genre: newData.genre,
                    price: newData.price
                }
            }
            return book;
        });
        let dataSentToFile = JSON.stringify(updatedBook, null, 6);
        fs.writeFile("books.json", dataSentToFile, (err) => {
            if (err) {
                console.log(err);
            }
            res.send({
                message: "Book Updated Successfully",
                books: updatedBook,
            })
        });
    });
});

// updating price using patch
app.patch("/books/:id", (req, res) => {
    let targetId = req.params.id;
    const newPrice = req.body.price;
    fs.readFile("books.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let formattedData = JSON.parse(data);
        let updatedPriceBooks = formattedData.map(book => {
            if (book.id == targetId) {
                return {
                    ...book,
                    price: newPrice,
                }
            }
            return book;
        });
        const dataSentToFile = JSON.stringify(updatedPriceBooks, null, 6);
        fs.writeFile("books.json", dataSentToFile, (err) => {
            if(err){
                console.log(err);
            }
            res.send({
                message: "Price Updated Successfully",
                books: updatedPriceBooks,
            });
        });
    });
});

// Deleting task by id 
app.delete("/books/:id", (req, res) => {
    let targetId = req.params.id;
    fs.readFile("books.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let formattedData = JSON.parse(data);
        let remainingResults = formattedData.filter(book => book.id != targetId);
        let dataSentToFile = JSON.stringify(remainingResults, null, 6);
        fs.writeFile("books.json", dataSentToFile, (err) => {
            if (err){
                console.log(err)
            }
            res.send({
                message: "Book deleted succesfully",
                books: remainingResults,
            })
        });
    });
});


// Server 
const PORT = 3070;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});