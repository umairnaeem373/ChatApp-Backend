const express = require("express");
const dotenv = require("dotenv");
const socket = require("./sockets/socket.io");
const connectDb = require("./config/connectDb");
const router = require("./router");
const colors = require("colors");

const app = express();
dotenv.config();

app.use(express.json());

// Connect to MongoDB
connectDb()

app.use("/api/v1", router);

app.all('/',(req, res, next) => {
    res.status(404).json({message: "Route not found"});
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Server is running on port port ${port}`.cyan.inverse);
});
 
socket.initSocket(server);



