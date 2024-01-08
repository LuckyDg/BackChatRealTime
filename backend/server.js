require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const authRoutes = require("./routers/authroutes");
const authenticate = require("./middlewares/authenticate");
const axios = require("axios");
const { insertMessage, getRecentMessages } = require("./data/db");

const app = express();
const server = http.Server(app);

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

io.use(authenticate);

io.on("connection", async (socket) => {
  console.log(`usuario ${socket.id} connectado`);

  try {
    const recentMessages = await getRecentMessages();
    socket.emit("recent-messages", recentMessages);
  } catch (error) {
    console.error("Error al obtener los mensajes recientes:", error);
  }

  socket.on("disconnect", () => {
    console.log(`usuario ${socket.id} desconenctado`);
  });

  socket.on("message", async (msg) => {
    console.log("Mensaje recibido: " + msg);
  
    if (!socket.user) {
      console.log("Usuario no autenticado intentó enviar un mensaje");
      return;
    }
  
    const sender = socket.user.username;
    const text = msg;
    const timestamp = new Date(); // Asegúrate de que la marca de tiempo sea correcta
  
    try {
      // Primero, insertamos el mensaje en la base de datos
      const message = await insertMessage(sender, text, timestamp);
  
      // Luego, intentamos enviar el mensaje a Kafka
      axios.post("http://kafka-api:8000/send", { message: message })
        .then(response => console.log("Mensaje enviado a Kafka"))
        .catch(error => console.log("Error al enviar el mensaje a Kafka", error));
  
      // Emitir el mensaje a todos los clientes conectados
      io.emit("message", message);
    } catch (error) {
      console.error("Error al manejar el mensaje:", error);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Conexion Establecida: ${PORT}`);
});
