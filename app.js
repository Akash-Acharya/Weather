const express = require("express");
const app = express();
const https = require("https");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){

	// res.write(__dirname+"/index.html"); 
	// res.write(__dirname+"/style.css");
	res.sendfile(__dirname+"/index.html");
});

app.post("/", function(req,res){
	console.log("Post get it...")

	var loc = req.body.city;
	console.log(loc)


	// const loc = "Puri"
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid=8f3ca6f17710a57a0bc9d54061c9d2c3&units=metric";

	// const url = "https://api.openweathermap.org/data/2.5/weather?q=balasore&appid=8f3ca6f17710a57a0bc9d54061c9d2c3&units=metric";

	https.get(url, function(response){
		console.log('statusCode:',response.statusCode);

		response.on("data", function(data){
			const weather = JSON.parse(data);
			// console.log(weather);

			const temp = weather.main.temp;  // get Temperature from api(json) 
			// console.log(temp);

			const description = weather.weather[0].description;
			// console.log(description);
			const icon = weather.weather[0].icon
			// console.log(typeof(icon))
			const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

			res.write("<p>The weather is "+description+"</p>");
			res.write("<h1>The Temperature in "+loc+" is "+temp+" Degree Centigrade.</h1>");
			res.write("<img src="+icon_url+" >");
			res.send();
		});
	});
})


app.listen(3000, function(){
	console.log("App run in 3000 port...");
});