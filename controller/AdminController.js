const Blog = require("../model/Blog");
const Service = require("../model/Service");
const cloudinary = require("../util/cloudinary");


module.exports={
    RenderAdminhome : async(req,res)=>{
        try {
            res.render('admin/home',{layout:"adminlayout"})
        } catch (error) {
            console.log(error);
        }
    },
    RenderAdminService : async(req,res)=>{
        try {
            const Data = await Service.find();
            res.render('admin/service',{layout:"adminlayout",Data})
        } catch (error) {
            console.log(error);
        }
    },
    AddService : async(req,res)=>{
        try {
            const {name,description} = req.body
            const result = await cloudinary.uploader.upload(req.file.path)
            const image = result.url
            await Service.create({name,description,image})
            console.log('Banner Added successfully');
            res.redirect('/admin/service'); 
        } catch (error) {
            console.log(error);
        }
    },
    EditService : async(req,res)=>{
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            const data = await Service.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Service not found' });
            }
    
            let image = data.image;
    
            if (req.file) {
                // Extract the public ID of the existing image from its URL
                const publicId = image.split('/').pop().split('.')[0];
    
                // Destroy the old image from Cloudinary
                const destroyResult = await cloudinary.uploader.destroy(publicId);
                console.log(destroyResult, "Image deletion result");
    
                // Upload the new image to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                image = uploadResult.url; // Update image URL with the new one
                console.log(uploadResult, "Image upload result");
            }
    
            // Update the banner with new details
            await Service.findByIdAndUpdate(id, {
                name,
                description,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/service');
        } catch (error) {
            console.log(error);
        }
    },
    DeleteService : async(req,res)=>{
        try {
            const id = req.params.id;
            await Service.findByIdAndDelete(id);
            console.log('Deleted Successfully');
            res.redirect('/admin/service')
        } catch (error) {
            console.log(error);
        }
    },
    RenderAdminBlog : async(req,res)=>{
        try {
            const Data = await Blog.find();
            res.render('admin/blog',{layout:"adminlayout",Data});
        } catch (error) {
            console.log(error);
        }
    },
    AddBlog : async(req,res)=>{
        try {
            const {name,description} = req.body
            const result = await cloudinary.uploader.upload(req.file.path)
            const image = result.url
            await Blog.create({name,description,image})
            console.log('Blog Added successfully');
            res.redirect('/admin/blog'); 
        } catch (error) {
            console.log(error);
        }
    },
    EditBlog : async(req,res)=>{
        try {
            const id = req.params.id;
            const { name, description } = req.body;
            const data = await Blog.findById(id);
    
            if (!data) {
                return res.status(404).json({ message: 'Blog not found' });
            }
    
            let image = data.image;
    
            if (req.file) {
                // Extract the public ID of the existing image from its URL
                const publicId = image.split('/').pop().split('.')[0];
    
                // Destroy the old image from Cloudinary
                const destroyResult = await cloudinary.uploader.destroy(publicId);
                console.log(destroyResult, "Image deletion result");
    
                // Upload the new image to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                image = uploadResult.url; // Update image URL with the new one
                console.log(uploadResult, "Image upload result");
            }
    
            // Update the banner with new details
            await Blog.findByIdAndUpdate(id, {
                name,
                description,
                image
            });
    
            console.log("Updated successfully");
            res.redirect('/admin/blog');
        } catch (error) {
            console.log(error);
        }
    },
    DeleteBlog : async(req,res)=>{
        try {
            const id = req.params.id;
            await Blog.findByIdAndDelete(id);
            console.log('Deleted Successfully');
            res.redirect('/admin/blog')
        } catch (error) {
            console.log(error);
        }
    },
    
}