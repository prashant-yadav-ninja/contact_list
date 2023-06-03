// require the library
const mongoose = require('mongoose') ;


// mongoose.set("strictQuery", true);

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db ') ;

// accessing to database through db
const db = mongoose.connection ;

db.on('error',console.error.bind(console,'errro in connecting to db')) ;

db.once('open',function(){
    console.log('succesfull connection to db') ;
})