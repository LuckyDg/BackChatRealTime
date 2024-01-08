require("dotenv").config();
const express = require("express");
const { producer } = require("./kafka");

const app = express();
app.use(express.json());

// Conectar el productor de Kafka al iniciar la aplicación
producer.connect().then(() => {
  console.log("Productor de Kafka conectado");
});

app.post("/send", async (req, res) => {
  try {
    const { message } = req.body;
    await producer.send({
      topic: "chat-messages",
      messages: [{ value: JSON.stringify(message) }],
    });
    res.status(200).json({
      success: true,
      message: "Mensaje enviado a Kafka",
    });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar mensaje"
    });
  }
});

// app.get("/consume", async (req, res) => {
//   await consumer.connect();
//   await consumer.subscribe({
//     topic: "chat-messages",
//     fromBeginning: true,
//   });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const content = JSON.parse(message.value.toString());
//       console.log(`Mensaje Recibido:`, content);
//       // Aquí puedes implementar la lógica para manejar mensajes recibidos
//     },
//   });
//   res.send("Consumidor de Kafka iniciado");
// });

// Manejar la desconexión del productor al cerrar la aplicación
// process.on('exit', () => producer.disconnect());

process.on('SIGINT', async () => {
  console.log('Cerrando productor de Kafka...');
  await producer.disconnect();
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Aquí podrías cerrar el proceso o intentar una reconexión
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Aquí podrías cerrar el proceso o intentar una reconexión
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});
