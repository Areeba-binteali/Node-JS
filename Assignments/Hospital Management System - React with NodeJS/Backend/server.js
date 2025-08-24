require("dotenv").config();
require("./config/db")

const express = require("express");
const logReqBody = require("./middleware/logReqBody");

const app = express();

app.use(express.json());
app.use(logReqBody);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})