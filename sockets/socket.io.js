const { Server } = require("socket.io");
const Message = require("../models/Message");

let ioInstance = null;

function initSocket(server) {
  if (!ioInstance) {
    ioInstance = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    console.log("Socket.IO initialized".blue.inverse);


    ioInstance.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      
      socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
        const message = await new Message({ senderId, receiverId, text }).save();

        // 🎯 Emit the message to the specific user
        ioInstance.emit(`message-${receiverId}`, message); // Send real-time update to receiver
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return ioInstance;
}

function getSocketIO() {
  if (!ioInstance) {
    throw new Error("Socket.IO not initialized. Call initSocket(server) first.");
  }
  return ioInstance;
}

module.exports = {
  initSocket,
  getSocketIO,
};