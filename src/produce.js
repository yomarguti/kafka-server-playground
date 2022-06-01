require("dotenv").config();

const kafkaClient = require("./kafkaClient");

const producer = kafkaClient.producer();

const produce = async () => {
  await producer.connect();
  let i = 0;
  setInterval(async () => {
    await producer.send({
      topic: process.env.TOPIC,
      acks: 1,
      messages: [{ key: String(i), value: `This is message ${i}` }],
    });
    i++;
  }, 2000);
  //await producer.disconnect()
};

module.exports = produce;
