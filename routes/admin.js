var express = require('express');
const AdminController = require('../controller/AdminController');
const upload = require('../util/multer');
const Contactcontroller = require('../controller/Contactcontroller');
const AdminAuth = require('../controller/AdminAuth');
const adminauth = require('../middlewear/adminauth');
var router = express.Router();

/* GET users listing. */
router.get('/',adminauth.adminauth, AdminController.RenderAdminhome);
router.post('/login',  AdminAuth.PostLogin);
router.get('/login',  AdminAuth.GetLogin);
router.get('/logout',adminauth.adminauth, adminauth.adminauth, AdminAuth.AdminLogout)

router.get('/service',adminauth.adminauth, AdminController.RenderAdminService);
router.post('/add-service',adminauth.adminauth, upload.single('image'),AdminController.AddService);
router.post('/edit-service/:id',adminauth.adminauth, upload.single('image'),AdminController.EditService);
router.get('/delete-service/:id',adminauth.adminauth, AdminController.DeleteService);

router.get('/blog',adminauth.adminauth, AdminController.RenderAdminBlog);
router.post('/add-blog',adminauth.adminauth, upload.single('image'),AdminController.AddBlog);
router.post('/edit-blog/:id',adminauth.adminauth, upload.single('image'),AdminController.EditBlog);
router.get('/delete-blog/:id',adminauth.adminauth, AdminController.DeleteBlog);

router.get('/contact',adminauth.adminauth, Contactcontroller.RenderContactAdminPage)
router.post('/Addcontact', Contactcontroller.AddContact);
router.get('/delete-contact/:id',adminauth.adminauth, Contactcontroller.DeleteContact);



module.exports = router;
