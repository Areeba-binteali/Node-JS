const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { resolveSoa } = require("dns");
const app = express();

// Middleware
app.use(express.json());

// defining saltRounds
const saltRounds = 10

// Getting all the registered users without exposing password
app.get("/users", (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        // handling error
        if (err) {
            console.log(err);
        }

        // Using Data - initialy handling empty file

        let formattedData = JSON.parse(data);
        if (formattedData.length <= 0) {
            res.send({
                message: "No User Found",
                description: "There's no user registered at the moment."
            });
        }
        else {
            let allUsers = formattedData.map((user) => {
                return {
                    name: user.name,
                    email: user.emailAddress
                }
            });
            res.send({
                message: "All Users",
                users: allUsers,
            });
        }
    });
});

// Getting User by email or name
app.get("/users/:email", (req, res) => {
    let targetEmail = req.params.email;
    fs.readFile("users.json", "utf-8", (err, data) => {
        // handling error
        if (err) {
            console.log(err)
        }
        const formattedData = JSON.parse(data)
        // matching data
        const matchedEmailUser = formattedData.find(user => user.emailAddress == targetEmail);

        // handling if no user with the associated email
        if (matchedEmailUser) {
            res.send({
                message: "Data of the user",
                user: {
                    name: matchedEmailUser.name,
                    email: matchedEmailUser.emailAddress
                }
            });
        } else {
            res.send({
                message: "No user found with the associated email, try a different search",
                error: "404 User Not Found"
            });
        }
    });
});

// app.get("/users/:name", (req, res) => {
//     let targetName = req.params.name;
//     fs.readFile("users.json", "utf-8", (err, data) => {
//         // handling error
//         if (err) {
//             console.log(err)
//         }
//         const formattedData = JSON.parse(data)
//         // matching data
//         const matchedNameUser = formattedData.find(user => user.name == targetName);

//         // handling if no user with the associated email
//         if (matchedNameUser) {
//             res.send({
//                 message: "Data of the user",
//                 user: matchedNameUser
//             });
//         } else {
//             res.send({
//                 message: "No user found with the associated email, try a different search",
//                 error: "404 User Not Found"
//             });
//         }
//     });
// });

// Posting -> Creating new user with hashed password
app.post("/users", (req, res) => {
    let newData = req.body;

    // hashing password 
    let hashedPassword;
    let passwordToBeHashed = newData.password;
    bcrypt.hash(passwordToBeHashed, saltRounds, (err, hash) => {
        // handling error
        if (err) {
            console.log(err)
        }
        hashedPassword = hash;
        fs.readFile("users.json", "utf-8", (err, data) => {
            // handling error
            if (err) {
                console.log(err);
            }
            const formattedData = JSON.parse(data);
            const newID = formattedData.length > 0 ? Math.max(...formattedData.map(user => user.id)) + 1 : 0;
            const newUser = {
                id: newID,
                name: newData.name,
                emailAddress: newData.emailAddress,
                password: hashedPassword,
            }
            formattedData.push(newUser);
            const dataSentToFile = JSON.stringify(formattedData, null, 5);

            fs.writeFile("users.json", dataSentToFile, (err) => {
                if (err) {
                    console.log(err)
                }
                res.send({
                    message: "User Added Succesfully!",
                    users: formattedData
                });
            })

        });
    });
});

// deleting use by email
app.delete("/users/:email", (req, res) => {
    let targetEmail = req.params.email;
    fs.readFile("users.json", "utf-8", (err, data) => {
        // handling error
        if (err) {
            console.log(err)
        }
        let users = JSON.parse(data);
        let matchedResults = users.find(user => user.emailAddress == targetEmail)
        if (matchedResults) {
            const newData = users.filter(user => user.emailAddress != targetEmail);
            const dataSentToFile = JSON.stringify(newData, null, 5)
            fs.writeFile("users.json", dataSentToFile, (err) => {
                if (err) {
                    console.log(err);
                }
                res.send({
                    message: "User deleted Succesfully!",
                    deletedUser: matchedResults.name + " succesfully deleted",
                    remainingUsers: newData,
                });
            });
        } else {
            res.send({
                message: "No user found with the associated email so your request can not be completed",
                error: "404 User not Found"
            })
        }
    });
});

// Server
const PORT = 3700;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});