const mongoose = require("mongoose")

const ServiceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
})
const Service = mongoose.model('Service',ServiceSchema);
module.exports = Service;