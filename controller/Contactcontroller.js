const Contact = require("../model/Contact");
const dotenv=require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
//   info@alameencargo.com Alameen@786
module.exports={
    RenderContactAdminPage : async(req,res)=>{
        try {
            const Data = await Contact.find();
            res.render("admin/contact",{layout:"adminlayout",Data});
        } catch (error) {
            console.log(error);
        }
    },
    AddContact : async(req,res)=>{
        try {
            const data = req.body;
            await Contact.create(data)
            res.redirect("/contact");
            console.log("Contact Added Succesfully");
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'info@alameencargo.com',
                subject: `${data.subject}`,
                html: `
                  <h3>Contact Form Enquiry</h3><br/>
                  Name: ${data.name}<br/><br/>
                  Email: ${data.email}<br/><br/>
                  Subject: ${data.phone}<br/><br/>
                  Message:${data.message}<br/><br/>
                `
              }; 
            
              
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error sending email:', error);
                } else {
                  console.log('Email sent:', info.response );
                }
              });

        } catch (error) {
            console.log(error);
        }
    }
}