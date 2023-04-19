
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


/* Transporter setting */
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: "mnpythondummy@gmail.coma",
        pass: "sijaunlwkryfmutz"
    }
})


/*  Sample message 
const sampleMessage = {
    from: "thisissender@gmail.com",
    to: "mnpythondummy@gmail.com, denizbaspb@gmail.com",
    subject: "This is Subjct!",
    text: "This is the message!" 
}
*/


app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function (req, res) {
    var email = req.body.firstName;
    console.log(email)

    var message = {
        from: req.body.firstName + req.body.secondName,
        to: "mnpythondummy@gmail.com",
        subject: "New email addres subscription!",
        text: "Address: " + req.body.email
    }

    transporter.sendMail(message, function(error, info){
        if (error) {
       console.log(error);
       res.sendFile(__dirname + "/failure.html");
        } else {
          console.log('Email sent: ' + info.response);
          res.sendFile(__dirname+"/success.html")
          // do something useful
        };
    })

});


app.post("/failure", function (req, res) {
    res.sendFile(__dirname+"/signup.html")
})



app.listen(3000, function (req, res) {
    console.log("Server is running on port 3000.")
})
