const express = require("express");
const path = require("path");
const port = 8000;
// const bodyParser = require('body-parser') ;

const db = require("./config/mongoose");

const Contact = require("./module/contact");
// mongoose.set("strictQuery", true);
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.use(express.static("asset"));

// app.use(function (req, res, next) {
//   console.log("this is mw1");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("this is mw2");
//   next();
// });

var contactList = [
  {
    name: "saurabh",
    phone: 7388853978,
  },
  {
    name: "prashant",
    phone: 23,
  },
  {
    name: "nitish",
    phone: 22,
  },
];

app.get("/", function (req, res) {
  // console.log(req) ;
  // console.log(__dirname) ;
  // res.send('<h1>cool this is running</h1>') ;

  Contact.find({}, function (err, contact) {
    if (err) {
      console.log("error in finding contacts");
      return;
    }

    return res.render("home", {
      titlegiven: "My Contact List",
      contact_list: contact,
    });
  });

  // return res.render("home", {
  //   titlegiven: "My Contact List",
  //   contact_list: contactList,
  // });
});

app.get("/practise", function (req, res) {
  return res.render("practise", { title: "Lets play in Ground" });
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //   phone: req.body.phone,
  //   name: req.body.name,
  // });
  // contactList.push(req.body) ;

  Contact.create(
    {
      // req.body
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContatct) {
      if (err) {
        console.log("error in creating contact");
        return;
      }

      console.log("********", newContatct);
      return res.redirect("back");
    }
  );

  // return res.redirect('/') ;
});

// for deleting the contact
app.get("/delete-contact/", function (req, res) {
  
  // get the id from the query in the url
  let id = req.query.id ;

  // let phonecheck = req.query.phone;

  // finding and deleting the contact from the datatabase 
  Contact.findByIdAndDelete(id , function(err){
    if (err){
      console.log('error in deleting the contact from database') ;
      return ;
    }
    
    return res.redirect("/");

  }) ;





  // let indelete;
  // for (let i of contactList) {
  //   if (contactList.phone == phonecheck) {
  //     indelete = i;
  //     break;
  //   }
  // }
  // contactList.splice(indelete, 1);
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the serve");
  } else {
    console.log("Server is running and runs on port : ", port);
  }
});
