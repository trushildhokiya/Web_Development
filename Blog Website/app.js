// importing node modules 
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import lodash from "lodash"

//creating constant texts
const content_1 = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla nobis hic harum reprehenderit itaque saepe molestiae eaque ad! Vel ea, laboriosam possimus ipsum magnam vitae quae commodi. Fugit, fuga quibusdam! Asperiores, aspernatur debitis quos nobis saepe unde. Magni unde animi quae a ad. Unde, obcaecati?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda hic. Adipisci illo ex sed dolore exercitationem autem praesentium qui id odit, iste eaque sequi suscipit repellendus quasi enim est, aut cum blanditiis tempore eius recusandae quis magni? Quibusdam animi vitae sit obcaecati autem tenetur consequuntur nostrum atque, sunt alias, non est corrupti molestias doloribus. Inventore iusto, reprehenderit saepe nobis et cum nostrum quo velit, qui illum ullam aut delectus nulla facilis fuga totam illo deleniti repellat assumenda aliquid porro blanditiis. Necessitatibus at voluptatem nam, veniam, minus officiis tenetur veritatis placeat consequatur voluptatum dolor amet esse. Quos id beatae praesentium." ;

const content_2="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

const content_3= "There was a time when he would have embraced the change that was coming. In his youth, he sought adventure and the unknown, but that had been years ago. He wished he could go back and learn to find the excitement that came with change but it was useless. That curiosity had long left him to where he had come to loathe anything that put him out of his comfort zone.Waiting and watching. It was all she had done for the past weeks. When you’re locked in a room with nothing but food and drink, that’s about all you can do anyway. She watched as birds flew past the window bolted shut. She couldn’t reach it if she wanted too, with that hole in the floor. She thought she could escape through it but three stories is a bit far down.";

//creating global array called posts

let posts=[];

// creating app
const app= express();

//using lodash
const _= lodash();

//acquiring body parser
app.use(bodyParser.urlencoded({extended:true}));

//using ejs
app.set("view engine","ejs");

//using static file
app.use(express.static("public"));

//home route response
app.get("/",function(req,res){
    res.render("home",{home_text:content_1, allPosts:posts});
})

//contact route response

app.get("/contact",function(req,res){
    res.render("contact",{contact_content:content_2});
});

//about route response

app.get("/about",function(req,res){
    console.log(posts);
    res.render("about",{about_content:content_3});
});

//compose route response

app.get("/compose",function(req,res){
    res.render("compose");
})

//creating express routing 
app.get("/posts/:title",function(req,res){
    const requestedTitle= req.params.title;
    posts.forEach(function(feeds){
        if(_.lowerCase(feeds.title)==_.lowerCase(requestedTitle)){
            
            res.render("post",{post_title:feeds.title,post_content:feeds.content})
        }
    })
})

//handling post request from compose page

app.post("/compose",function(req,res){
    const post={
        title:req.body.postTitle,
        content:req.body.postContent
    }
    posts.push(post);
    res.redirect("/");
})

//start app at port 3000
app.listen(3000,function(){
    console.log("Server started runnig at port 3000");
});