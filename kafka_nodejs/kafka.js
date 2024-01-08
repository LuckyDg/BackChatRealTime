const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "mi-aplicacion",
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

console.log("Configuración de Kafka:", {
  brokers: [process.env.KAFKA_BROKER],
  sasl: {
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

// const consumer = kafka.consumer({ groupId: "chat-group" });

module.exports = { producer };

