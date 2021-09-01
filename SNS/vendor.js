"use strict";

const AWS=require('aws-sdk');
const faker=require('faker');
const {Consumer}=require('sqs-consumer');

AWS.config.update({region: 'us-east-1'});

const sns=new AWS.SNS();
const arn='arn:aws:sns:us-east-1:462293665935:CAPSsystem';
const vendorId='vendor';

setInterval(()=>{
    const orderFromCustomer={
        orderId:faker.datatype.uuid(),
        customer:faker.name.findName(),
        // address:faker.address.streetAddress(),
        vendorId:vendorId
    };

    const params={
        Message:JSON.stringify(orderFromCustomer),
        TopicArn:arn
    }
   
    sns.publish(params).promise().then(res=>{
        console.log('Pickup order',res);
    }).catch(error=>{
        console.error(error.message);
    });
},5000);

const app=Consumer.create({
    queueUrl:`https://sqs.us-east-1.amazonaws.com/462293665935/labCaps`,
    handleMessage:async(message)=>{
        console.log("Delivered:",message.Body);
    },
    pollingWaitTimeMs:20000
},5000);

app.start();