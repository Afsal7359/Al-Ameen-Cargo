const Contact = require("../model/Contact");
const dotenv=require('dotenv');
const nodemailer = require('nodemailer');
const Booking = require("../model/Booking");

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
    },
    DeleteContact : async(req,res)=>{
        try {
            const id = req.params.id
            await Contact.findByIdAndDelete(id);
            res.redirect('/admin/contact')
            console.log("deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    },
    ShipmentBooking : async(req,res)=>{
      try {
        const data = req.body;
        console.log(data,"data");
        
        await Booking.create(data);
        res.redirect("/");
        console.log("Booking Added Succesfully");


        const formatBoxDetails = (boxWeights, boxDimensions, boxPackingLists) => {
          let boxDetails = '';
      
          for (let i = 0; i < boxWeights.length; i++) {
              boxDetails += `
                <strong>Box ${i + 1} Details:</strong><br/>
                Box Weight: ${boxWeights[i]}<br/>
                Box Dimensions: ${boxDimensions[i]}<br/>
                Box Packing List: ${boxPackingLists[i]}<br/><br/>
              `;
          }
      
          return boxDetails;
      };

      
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'info@alameencargo.com',
          subject: `New Shipment Booking`,
          html: `
            <h3>Mail Generated From Al-Ameen Cargo Website</h3><br/>
            <strong>Sender Name:</strong> ${data.SenderName}<br/><br/>
            <strong>Sender Number:</strong> ${data.SenderNumber}<br/><br/>
            <strong>Sender Email:</strong> ${data.SenderEmail}<br/><br/>
            <strong>Sender Address:</strong> ${data.SenderAddress}<br/><br/>
            <strong>Receiver Name:</strong> ${data.ReceiverName}<br/><br/>
            <strong>Receiver Number:</strong> ${data.ReceiverNumber}<br/><br/>
            <strong>Receiver Email:</strong> ${data.ReceiverEmail}<br/><br/>
            <strong>Receiver Address:</strong> ${data.ReceiverAddress}<br/><br/>
            ${formatBoxDetails(data.BoxWeight, data.BoxDimensions, data.BoxPackingList)}
            <strong>Value Of Goods:</strong> ${data.valueOfGoods}<br/><br/>
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