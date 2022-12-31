import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app=express();

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articlesSchema = new mongoose.Schema({
    title:String,
    content:String,
});
 
const Article = mongoose.model("articles",articlesSchema);

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.route('/articles').get(
    (req,res)=>{
    Article.find((err,foundArticles)=>{
        if(!err){
            res.send(foundArticles);
        }
        else{
            console.log(err);
        }
    })
}
).post(
    (req,res)=>{
    const newArticle = new Article({
        title: req.body.title,
        content:req.body.content,
    })

    newArticle.save((err)=>{
        if(!err){
            res.send("Successfully entered data in API ")
        }
        else{
            res.send(err);
        }
    });
}
).delete(
    ()=>{
    Article.deleteMany((err)=>{
        if(!err){
            res.send("Successfully deleted all enteries in API");
        }
        else{
            res.send(err);
        }
    })
}
)

app.route('/articles/:title')
.get((req,res)=>{
    Article.findOne({title:req.params.title},(err,foundArticle)=>{
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send(err);
        }
    })
})
.put((req,res)=>{
    Article.updateOne({title:req.params.title},
        {title:req.body.title, content:req.body.content},
        {overwrite:true},(err)=>{
            if(!err){
                res.send("Successfully updated content")
            }
        })
})
.patch((req,res)=>{
    Article.updateOne({title:req.params.title},{$set:req.body},(err)=>{
        if(!err){
            res.send("Successfully updated the query")
        }
    })
})
.delete((req,res)=>{
    Article.deleteOne({title:req.params.title},(err)=>{
        if(!err){
            res.send("Successfully deleted content");
        }
        else{
            res.send(err)
        }
    })
});


app.listen("3000",()=>{
    console.log("server started running at port 3000");
})