const express = require("express");

const fs = require("fs")

const app = express();

// Middleware
app.use(express.json())

let students = [
    {
        id: 1,
        name: "Areeba",
        age: 18,
        rollNum: 307,
        "dob": "4 March 2007"
    }, {
        id: 2,
        name: "Noor",
        age: 20,
        rollNum: 307,
        dob: "13 December 2004"
    }, {
        id: 3,
        name: "Rehan",
        age: 26,
        rollNum: 304,
        dob: "21 August 1999"
    }, {
        id: 4,
        name: "Danish",
        age: 28,
        rollNum: 303,
        dob: "6 May 1997"
    },
]

// Get
app.get("/students", (req, res) => {
    res.send({
        message: "Data of the students",
        data: students,
    })
})


// Patch
app.patch("/students/:id", (req, res) => {
    let request = Number(req.params.id);
    console.log(request)
    let data = req.body;
    let updated = students.map((std) => {
        if (std.id === request) {
            return {
                ...std,
                name: data.name,
                age: data.age,
                rollNum: data.rollNum,
                dob: data.dob
            }
        }
    })

    res.send({
        message: "Data Updated",
        data: updated,
    })
})


// Get Products
app.get("/products", (req, res) => {
    fs.readFile('products.json', 'utf-8', (err, data) => {
        console.log(data);
        console.log(err);
        let products = JSON.parse(data);
        res.json({
            message: "Data of the Prdoucts",
            data: products,
        })
    })

})

// Post Products
app.post("/products", (req, res) => {
    const newData = req.body;
    fs.readFile('products.json', 'utf-8', (err, data) => {
        let products = JSON.parse(data);
        products.push(newData);
        const dataToBeStored = JSON.stringify(products)
        fs.writeFile('products.json', dataToBeStored, (err) => {
            console.log(err);
        })
        res.json({
            message: "Data of the Prdoucts",
            data: products,
        })
    })

})


// Server
const port = 3737;
app.listen(port, () => {
    console.log(`Server started at port: http://localhost:${port}/`)
})