const Service = require('../model/Service')
const Blog = require('../model/Blog')

module.exports ={

     RenderHomePage : async(req,res)=>{
        try {
            const ServiceData = await Service.find();
            const BlogData = await Blog.find().sort({_id:-1}).limit(3)
            res.render('user/home',{ServiceData,BlogData})
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
    }
}