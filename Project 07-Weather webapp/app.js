import express from "express";
import { dir } from "node:console";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
const app=  express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html"); 
});

app.post("/",function(req,res){
    // getting query from user 
    const query = req.body.city;
    // declaring constants and variable for url 
    const apiKey="53e79bc0fe6c3b484f640bf1660d67ce";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    // getting data from url using https
    https.get(url,function(response){
        response.on("data",function(data){
            // converting recieved data to json format 
            const weatherData = JSON.parse(data);
            // getting specific data drom recieved data and store it in constants 
            const temp= weatherData.main.temp;
            const weather_desc= weatherData.weather[0].description;
            const image_url = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            //write the response to send
            res.write("<h1>Temperature in "+query+" is "+temp+" degrees Celsius </h1>");
            res.write("<p>Weather is currently "+weather_desc+"<p>");
            res.write("<img src="+image_url+">");
            //send the response
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("server is running at port 3000");
});


