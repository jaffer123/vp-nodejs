let AWS = require('aws-sdk');
const VP = require('../config/vp.json');

AWS.config.update({
    "region": VP.AWS.Region,
    "accessKeyId": VP.AWS.AccessKey,
    "secretAccessKey": VP.AWS.SecretKey
   });

let docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;