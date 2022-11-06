import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(cors()); 

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Server is running");
});

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended");
    })
});



httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));