// Importing required modules 
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";


//creating const app of express()
const app= express();

//to use static css in website
app.use(express.static("public"));

//global variable
let new_tasks=[];
let new_work_tasks=[];

//using ejs
app.set("view engine","ejs");
//code to use __dirname directly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get function
app.get("/",function(req,res){
    let date = new Date();

    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let today= date.toLocaleDateString("hi-IN",options);
    res.render("lists",{listTitle:today,myTask:new_tasks});
    
})

//setting work route
app.get("/work",function(req,res){
    res.render("lists",{listTitle:"Work List",myTask:new_work_tasks});
})

//aquiring app to use body parser
app.use(bodyParser.urlencoded({extended:true}));


//handling post request at home route
app.post("/",function(req,res){
    let task = req.body.dailyTask;
    if(req.body.list==="Work List"){
        new_work_tasks.push(task);
        res.redirect("/work");
    }
    else{
        new_tasks.push(task);
        res.redirect("/"); // redirect to home route to render the page
    }
    
    
});


//start servere at port
app.listen(3000,function()
{
    console.log("Server started running at port 3000");
});
