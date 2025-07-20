let express = require("express")
let app = express();

// Middleware
app.use(express.json())

let students = [
    {
        name: "Areeba",
        age: 18,
        rollNum: 307,
        "dob": "4 March 2007"
    },{
        name: "Noor",
        age: 20,
        rollNum: 307,
        dob: "13 December 2004"
    },{
        name: "Rehan",
        age: 26,
        rollNum: 304,
        dob: "21 August 1999"
    },{
        name: "Danish",
        age: 28,
        rollNum: 303,
        dob: "6 May 1997"
    },
]
// app.get("/students", (req, res) => {
//     res.send({
//         message: "Data of all the students", 
//         data : students,
//     })
// })

// Query Paraams
app.get("/students", (req, res) => {
    let request = req.query.age;
    console.log(request)
    let std = students
    if(request){
         std = students.filter((std) => std.age == request)
    
    }
    res.send({
        message: "Data of the students",
        data: std,
    })
})


// Params 
app.get("/students/:rollNum", (req, res) => {
    let request = req.params.rollNum;
    console.log(request)
    let std = students
    if(request){
         std = students.find((std) => std.rollNum == request)
    
    }
    res.send({
        data: std,
    })
})

app.post("/students", (req, res) => {
    // console.log(req.body)
    let std = students.push(req.body)
    res.send({
        message: "Data of all the students",
        data: std,
    })
})


const port = 3007;
app.listen(port, () => {
    console.log(`Server started at port: http://localhost:${port}/`)
})