
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname +"/index.html");
})

app.post("/", function(req, res){

    const area = req.body.cityName;
    const apiKey = "12dd7ca9ea3ee83b8905ec822844bcd1";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ area +"&units=metric&appid="+ apiKey;

    https.get(url, function(responce){

        responce.on("data", function(data){
            const weatherData = JSON.parse(data);

            const iconCode = weatherData.weather[0].icon;
            const icon = "http://openweathermap.org/img/wn/"+ iconCode +"@2x.png";

            res.write("<h1>The weather in "+ area +" is "+ weatherData.main.temp +" degrees</h1>");
            res.write("<p>The weather is currently "+ weatherData.weather[0].description +"</p>");
            res.write("<img src="+ icon +">");
            res.send();
        })
    })

})

app.listen(3000, function () {
    console.log("Sever is running on port 3000");
})