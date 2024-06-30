var express = require('express');
const Usercontroller = require('../controller/Usercontroller');
var router = express.Router();

/* GET home page. */
router.get('/',Usercontroller.RenderHomePage);
router.get('/about',Usercontroller.RenderAboutpage);
router.get('/service',Usercontroller.RenderServicePage);
router.get('/contact',Usercontroller.RenderContactPage);
router.get('/service',Usercontroller.RenderServicePage);
router.get('/blog',Usercontroller.RenderBlogPage);

module.exports = router;
