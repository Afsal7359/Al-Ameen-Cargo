const adminlogin = require("../model/adminlogin");

module.exports={
    GetLogin : async (req, res) => {
        try {
            // Check if the admin is already logged in
            if (req.session.adminLoggedIn) {
                console.log("Already logged in");
                 res.redirect('/admin');
            } else {
                // Admin is not logged in, render the login page
                res.render('admin/login', { layout: "adminlayout", adminlogin: true, adminlogErr: null });
            }
            // Admin is not logged in, render the login page

        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Server error' });
        }
    },
    
    PostLogin: async (req, res) => {
        try {
            console.log(req.body);
            const { email, password } = req.body;

            const loginadmin = await adminlogin.findOne({ email });
            console.log(loginadmin,'logadm');
            if (!loginadmin) {
                return res.render('admin/login', { layout: 'adminlayout', adminlogin: true, adminlogErr: 'Email does not exist' });
            }else{
 
                let passwordCorrect
                if(password===loginadmin.password){
                    passwordCorrect=true
                }else{
                    passwordCorrect=false
                }
                // const passwordCorrect = await bcrypt.compare(password, loginadmin.password);
                if (!passwordCorrect) {
                    // res.render('admin/login', { layout: "adminlayout", adminlogin: true });
                    return res.render('admin/Login', { layout: 'adminlayout', adminlogin: true, adminlogErr: 'Incorrect password' });
              
                } else {
                    req.session.admin = email;
                    req.session.adminloggedIn = true;
                    req.session.admlogErr=false;
                    res.redirect('/admin')
                }
    
            }
           



        } catch (err) {
            console.log(err);
            // Handle the error appropriately, such as sending an error response to the client
        }
    },
    AdminLogout: async (req, res) => {
        try {
            req.session.adminloggedIn = false;
            res.redirect('/admin/login')
        } catch (err) {
            console.log(err);
        }

    },
}