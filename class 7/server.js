require("dotenv").config();
require("./config/db")

const express = require("express");
const logReqBody = require("./middleware/logReqBody");
const publicRouter = require("./routes/publicRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(express.json());
app.use(logReqBody);

// router middleware
app.use('/api/v1/', publicRouter)
app.use('/api/v3/', adminRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})