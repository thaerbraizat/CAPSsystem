"use strict";
const { Consumer } = require("sqs-consumer");

const app = Consumer.create({
  queueUrl: "https://sqs.us-east-1.amazonaws.com/462293665935/labCaps",
  handleMessage: async (message) => {
    const orderFromCustomer = JSON.parse(JSON.parse(message.Body).Message);
    console.log("Picked up", orderFromCustomer);
    setTimeout(async () => {
      console.log(`Delivered ${orderFromCustomer.orderId}`);
    }, 5000);
  },
  pollingWaitTimeMs: 2000,
});

app.start();