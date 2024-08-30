const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    SenderName:{
        type:String,
        
    },
    SenderNumber:{
        type:String,
        
    },
    SenderEmail:{
        type:String,
        
    },
    SenderAddress:{
        type:String,
        
    },
    ReceiverName:{
        type:String,
        
    },
    ReceiverNumber:{
        type:String,
        
    },
    ReceiverEmail:{
        type:String,
        
    },
    ReceiverAddress:{
        type:String,
        
    },
    BoxWeight: [
        {
        
        },
    ],
    BoxDimensions: [
        {
           
        },
    ],
    BoxPackingList: [
        {
          
        },
    ],
    valueOfGoods:{
        type:String,
        
    }
})
const Booking = mongoose.model('Booking',BookingSchema);
module.exports = Booking;