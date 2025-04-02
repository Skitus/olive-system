const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

function uploadFile(file, res) {
  const fileStream = fs.createReadStream(file.filepath);

  const params = {
    Bucket: BUCKET_NAME,
    Key: file.originalFilename,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
}

function getFile(fileKey) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
  };

  return s3.getObject(params).promise();
}

function deleteFile(fileKey) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
  };

  return s3.deleteObject(params).promise();
}

module.exports = { uploadFile, getFile, deleteFile };
