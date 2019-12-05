const multipart                  =          require("connect-multiparty");
const multipartyMiddleware       =          multipart();
const Router                     =          require('express').Router();
const controller                 =          require('../controllers/mainControllers');

Router.route('/upload-single-file').post(multipartyMiddleware,controller.singleFileUpload);
Router.route('/upload-multiple-file').post(multipartyMiddleware,controller.multipleFileUpload);

module.exports=Router;