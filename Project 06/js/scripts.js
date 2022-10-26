var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var randomChosenColor;
var started=false;
var level=0;

$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}
function handler(event){
    var userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}
$(".btn").on("click",handler);

function playSound(name){
    var audio= new Audio("Sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("sucess");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}