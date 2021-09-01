'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const sns = new AWS.SNS();


const topic = 'arn:aws:sns:us-east-1:462293665935:CAPSsystem';
const msg = {
    title: 'teasttast',
    content: 'how sholud i meet u?'
};

const params = {
    TopicArn: topic,
    Message: JSON.stringify(msg)
}

sns.publish(params).promise().then(data=> {
    console.log(data)
}).catch(err=> {
    console.log(err)
});