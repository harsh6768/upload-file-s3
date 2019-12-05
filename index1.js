const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const multipart = require('connect-multiparty');
const multipartyMiddleware=multipart();

const app = express();

//S3 instance
const s3 = new AWS.S3({
  accessKeyId: "AKIASWTZKPGGYK7PLOWR",
  secretAccessKey: "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",
  bucket: "s3orionbucket"
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "s3orionbucket",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("profileImage");

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

app.post("/upload_file", multipartyMiddleware,(req, res) => {

//   console.log(req.files);

  profileImgUpload(req, res, error => {
    console.log(req.files.profileImage)
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.files.profileImage.name;
        const location=req.files.profileImage.path;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          imagePath:location
        });
      }
    }
  });
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
