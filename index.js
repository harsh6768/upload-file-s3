const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv=require('dotenv');
dotenv.config();

const app = express();
const routes=require('./routes/mainRoutes');
app.use('/',routes);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
