const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const multipart = require("connect-multiparty");
const multipartyMiddleware = multipart();
const fs = require("fs");
const dotenv=require('dotenv');
dotenv.config();

const app = express();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey:process.env.SECRET_ACCESS_KEY
});
const s3=new AWS.S3();

app.post("/upload_file", multipartyMiddleware, async (req, res) => {
  
  let file = req.files.profileImage;
  
  await fs.readFile(file.path,async(err, data)=>{
    
    if (err) {
      throw err;
    }

    let params = {
      Bucket: "s3orionbucket",
      Key: file.originalFilename,
      Body: data
    };

    s3.upload(params,(err, data)=>{
      if (err) {
        console.log(err);
      } else {
          console.log(data);
         res.send({
             message:"successfully upload file to s3",
             imageUrl:data
         })
        console.log("Successfully uploaded file");
      }
    });

    // let uploadedFile=await s3.putObject(params);
    // console.log(uploadedFile);
    
  });

});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
