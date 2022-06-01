require("dotenv").config();

const kafkaClient = require("./kafkaClient");

const consumer = kafkaClient.consumer({
  groupId: "my_group",
  /*    minBytes: 5,
   maxBytes: 1e6,
   // wait for at most 3 seconds before receiving new data
   maxWaitTimeInMs: 3000, */
});

const consume = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.TOPIC });
  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ message }) => {
      // here, we just log the message to the standard output
      console.log(`received message: with key: ${message.key} and value: ${message.value}`);
    },
  });
};

module.exports = consume;
