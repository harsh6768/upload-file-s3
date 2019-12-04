const multipart                  =          require("connect-multiparty");
const multipartyMiddleware       =          multipart();
const Router                     =          require('express').Router();
const controller                 =          require('../controllers/mainControllers');

Router.route('/upload-single-file').post(multipartyMiddleware,controller.singleFileUpload);

module.exports=Router;