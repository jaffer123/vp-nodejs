const mediaTableName = 'media';
const dynamodb = require('../config/db');
const AWS = require('aws-sdk');

exports.saveMedia = async function (data) {
    try {
        let date = new Date();
        let createInput = {
            "id": AWS.util.uuid.v4(),
            "user_id": (data?.user_id) ? data.user_id : "",
            "category": (data?.category) ? data.category : [],
            "title": (data?.title) ? data.title : "",
            "thumbnail": (data?.thumbnail) ? data.thumbnail : "",
            "media_path": (data?.media_path) ? data.media_path : "",
            "media_type": (data?.media_type) ? data.media_type : "",
            "description": (data?.description) ? data.description : "",
            "view": [],
            "like": [],
            "unlike": [],
            "comments": [],
            "createdAt": date,
            "updatedAt": date,
        }
        const params = {
            TableName: mediaTableName,
            Item : createInput
        }
        return await dynamodb.put(params).promise().then(() =>{
            return createInput;
        },(error)=>{
            console.error('Error in saveMedia',error);
        })
    } catch (e) {
        throw Error("save Media Error", e);
    }
}

exports.getMedia = async function (id) {
    try {
        const params = {
            TableName: mediaTableName,
            Key: {
              'id': id
            }
          }
          return await dynamodb.get(params).promise().then((response) => {
            return  response.Item;
          }, (error) => {
            console.error('get Media Error', error);
          });
    } catch (e) {
        throw Error("get Media Error", e);
    }
}
exports.getMediaAll = async function (data) {
    try {
        const params ={
            TableName : mediaTableName
        }
        const allMedias = await scanDynamoRecords(params,[]);
        return allMedias;
    } catch (e) {
        console.log(e)
        throw Error("get Media All Error", e);
    }
}
async function scanDynamoRecords(scanParams, itemArray) {
    try {
      const dynamoData = await dynamodb.scan(scanParams).promise();
      itemArray = itemArray.concat(dynamoData.Items);
      if (dynamoData.LastEvaluatedKey) {
        scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
        return await scanDynamoRecords(scanParams, itemArray);
      }
      return itemArray;
    } catch(error) {
        console.log(error)
        throw Error("get Media All Error", error);
      
    }
  }
exports.updateMedia = async function (data) {
    try {
        let id = data.id;
        let updateKey = data.updateKey;
        let updateValue = data.updateValue;
        const params = {
            TableName: mediaTableName,
            Key: {
              'id': id
            },
            UpdateExpression: `set ${updateKey} = :value`,
            ExpressionAttributeValues: {
              ':value': updateValue
            },
            ReturnValues: 'UPDATED_NEW'
          }
          return await dynamodb.update(params).promise().then((response) => {
            return response;
          })
    } catch (e) {
        throw Error("update Media Error", e);
    }
}
exports.deleteMedia = async function (id) {
    try {
        const params = {
            TableName: mediaTableName,
            Key: {
              'id': id
            },
            ReturnValues: 'ALL_OLD'
          }
          return await dynamodb.delete(params).promise().then((response) => {
            return response;
          }, (error) => {
            console.error("delete Media Error", error);
          })
    } catch (e) {
        throw Error("delete Media Error", e);
    }
}
