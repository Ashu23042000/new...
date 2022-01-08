require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes");
require("./db")();
const cors = require("cors");
const server = require("http").createServer(app);

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));

app.use(express.json());
app.use(router);


app.get("/", (req, res) => {
    res.send("Hello from server");
});


const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users = {};

io.on("connection", (socket) => {
    console.log(socket.id);
    // add new connect users and send all connected users list to clients
    socket.on("meConnected", (data) => {
        data.socketId = socket.id;

        if (!users[socket.id]) {
            users[socket.id] = data;
            io.emit("connectedUsers", users);
        }
    });

    // remove user if disconnect

    socket.on("disconnect", () => {

        delete users[socket.id];
        io.emit("connectedUsers", users);
        socket.broadcast.emit("callEnded")
    });

    socket.emit("me", socket.id);

    socket.on("callUser", ({ userToCall, signalData, from }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });


    socket.on("callRequest", (data) => {
        io.to(data.to).emit("someOneCallingYou", { to: data.to, from: data.from, fromName: data.fromName })
    });

    socket.on("requestReply", (data) => {
        io.to(data.to).emit("requestReplyFromOther", { to: data.to, from: data.from,reply: data.reply })
    })


});



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});