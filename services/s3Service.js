const S3 = require('aws-sdk/clients/s3');
const {AWS} = require('../config/vp.json');
const fs = require('fs');
const s3 = new S3({
    region:AWS.Region,
    accessKeyId:AWS.AccessKey,
    secretAccessKey:AWS.SecretKey
})
const bucketName = AWS.BucketName;

exports.uploadToS3 = async function (file) {
    try{
        let fileStream = await fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.fileName,
            ACL:'public-read-write',
        }
        return await s3.upload(uploadParams).promise()
    }catch(e){
        console.log(e)
        throw Error("uploadS3 Error", e);
    }
}
exports.viewS3 = async function (fileKey) {
    try{
        const downloadParams = {
            Key: fileKey,
            Bucket: bucketName
        }
        return s3.getObject(downloadParams).createReadStream()
    }catch(e){
        throw Error("getS3 Error", e);
    }
}