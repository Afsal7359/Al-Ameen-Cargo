const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
const Blog = mongoose.model('Blog',BlogSchema);
module.exports = Blog;