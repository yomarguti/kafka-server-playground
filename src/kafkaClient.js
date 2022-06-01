require("dotenv").config();
const { Kafka, logLevel } = require("kafkajs");

module.exports = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: process.env.BROKERS.split(","),
  logLevel: logLevel.NOTHING,
});
