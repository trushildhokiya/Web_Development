// Importing required modules 
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import mongoose from "mongoose";


//creating const app of express()
const app= express();

//to use static css in website
app.use(express.static("public"));

// connecting to mogodb using mongoose 
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");
mongoose.set("strictQuery",false);
// creating schema for items 
const itemsSchema = {
    name:String
};

// creating model/collection of listSchema 

const Items = mongoose.model("item",itemsSchema);

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

    let today= date.toLocaleDateString("us-en",options);
    Items.find({},function(err,foundItems){
        if(err){
            console.log(err);
        }
        else{
            res.render("lists",{listTitle:today,myTask:foundItems});
        }

    });
    
    
})


//aquiring app to use body parser
app.use(bodyParser.urlencoded({extended:true}));


//handling post request at home route
app.post("/",function(req,res){
    let task = req.body.dailyTask;

    const listTask= new Items({
        name:task,
    })

    listTask.save();
    res.redirect("/");
    
});

//handling post request for /delete route
app.post("/delete",function(req,res){
    const selected = req.body.checkbox;
    Items.findByIdAndRemove(selected,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully removed item with id: "+selected);
        }
        res.redirect("/");
    })
})

//start servere at port
app.listen(3000,function()
{
    console.log("Server started running at port 3000");
});
