const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    var firstN = req.body.firstName;
    var lastN = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstN,
                    LNAME: lastN,
                }

            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/bee905ab8a";

    const options = {
        method: "POST",
        auth: "Chris_Dev:569ece21c9c5f500b8c8830cab09026e-us10"
    }

    const postSignup = https.request(url, options, function(responce){

        if(responce.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        responce.on("data", function(data){
            //console.log(JSON.parse(data));
        })
    })

    postSignup.write(jsonData);
    postSignup.end();

})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Running: Port 3000");
})
