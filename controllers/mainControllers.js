const AWS = require("aws-sdk");
const fs = require("fs");

//Update configuration of the AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

async function uploadFileToS3(file) {
  
  fs.readFile(file.path, "utf-8", async (err, data) => {
    if (err) {
      throw err;
    }

    let params = {
      Bucket: "s3orionbucket",
      Key: file.originalFilename,
      Body: data
    };

    //to upload the file and it will return the image url
    s3.upload(params, (err, data) => {
      if (err)
        console.log(err);
      else 
        console.log(`file ${file.originalFilename} uploaded on s3 successfully`);
    });
    
  });
}

//Upload single file
let singleFileUpload = async (req, res) => {
  let file = req.files.profileImage;

  fs.readFile(file.path, "utf-8", async (err, data) => {
    if (err) {
      throw err;
    }

    let params = {
      Bucket: "s3orionbucket",
      Key: file.originalFilename,
      Body: data
    };

    //to upload the file and it will return the image url
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send({
          message: "successfully upload file to s3",
          imageUrl: data
        });
        console.log("Successfully uploaded file");
      }
    });

    // let uploadedFile=await s3.putObject(params);
    // console.log(uploadedFile);
  });
};

//multiple file upload
let multipleFileUpload = async (req, res) => {
  let files = req.files;

  Object.values(files).forEach(async file => {
    await uploadFileToS3(file);
  });

  res.send({
    message: "Successfully uploaded file",
  });
};

module.exports = {
  singleFileUpload,
  multipleFileUpload
};
