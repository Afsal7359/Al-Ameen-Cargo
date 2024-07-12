const Service = require('../model/Service')
const Blog = require('../model/Blog')

module.exports ={

     RenderHomePage : async(req,res)=>{
        try {
            const ServiceData = await Service.find();
            const BlogData = await Blog.find().sort({_id:-1}).limit(3)
            let message
            res.render('user/home',{ServiceData,BlogData,message})
        } catch (error) {
            console.log(error);
        }
    },
    RenderAboutpage : async(req,res)=>{
        try {
            res.render('user/about')
        } catch (error) {
            console.log(error);
        }
    },
    RenderServicePage: async(req,res)=>{
        try {
            const ServiceData = await Service.find();
            res.render('user/service',{ServiceData})
        } catch (error) {
            console.log(error);
        }
    },
    RenderBlogPage: async(req,res)=>{
        try {
            const BlogData = await Blog.find()
            const RecendBlog = await Blog.find().sort({_id:-1}).limit(3)
            res.render('user/blog',{BlogData,RecendBlog})
        } catch (error) {
            console.log(error);
        }
    },
    RenderContactPage: async(req,res)=>{
        try {
            res.render('user/contact');
        } catch (error) {
            console.log(error);
        }
    },
    RenderTrackingPage: async(req,res)=>{
        try {
            res.render('user/tracking');
        } catch (error) {
            console.log(error);
        }
    },
    TrackingPost: async (req, res) => {
        try {
            const trackingid = req.body.trackingid;
            console.log(trackingid, "id");
            const response = await fetch('https://erp.alameencargo.com/api/tracking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ booking_no: trackingid })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            const data = responseData.data;
            console.log(data, "dddddddddda");
            if (data?data.length !== 0 : data) {
                res.render('user/tracking',{ data: JSON.stringify(data) }); // Pass data as JSON string
            }else{
                const ServiceData = await Service.find();
                const BlogData = await Blog.find().sort({_id:-1}).limit(3)
                const message= "Tracking Id Not Found"
                res.render('user/home',{ServiceData,BlogData,message})
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}