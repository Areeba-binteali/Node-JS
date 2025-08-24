require("dotenv").config();
require("./config/db")

const express = require("express");
const logReqBody = require("./middleware/logReqBody");
const publicRouter = require("./routes/publicRouter");
const authMiddleware = require("./middleware/authMiddleware");
const adminOnly = require("./middleware/checkAdmin");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(express.json());
app.use(logReqBody);

app.use('/api/v1/', publicRouter)
app.use('/api/v2/', authMiddleware, adminOnly, adminRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})