import mongoose from "mongoose";
mongoose.set("strictQuery",false);
mongoose.connect("mongodb://127.0.0.1:27017/personsdB");

const personSchema= new mongoose.Schema({
    name:String,
    age:Number,
});

const person = mongoose.model("person",personSchema);

const p1= new person({
    name:"Mary",
    age:22
})

const p2 = new person({
    name:"Jack",
    age:45
})

person.find(function(err,persons){
    if(err){
        console.log(err);
    }
    else{
        mongoose.connection.close();
        persons.forEach(function(human){
            console.log(human.name);
        })
    }
})