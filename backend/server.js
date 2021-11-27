require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes");
require("./db")();
const cors=require("cors");

app.use(cors({
    origin: ["http://localhost:3000"]
}));

app.use(express.json());
app.use(router);


app.get("/", (req, res) => {
    res.send("Hello from server");
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});