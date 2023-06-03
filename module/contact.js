const mongoose = require('mongoose') ; 
// mongoose.set("strictQuery", true);


const contactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true 
        }
        ,

        phone:{
            type:String,
            required:true
        }
    }
);

// we have to give name of collection which is called in database
const Contact = mongoose.model('Contact',contactSchema) ;

module.exports = Contact ;
