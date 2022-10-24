for(var i =0 ; i<document.querySelectorAll(".drum").length;i++){

    document.querySelectorAll("button")[i].addEventListener("click", function (){
        var buttonPressed= this.innerHTML;
        makeSound(buttonPressed);
        flash(buttonPressed);
       
});
};

document.addEventListener("keydown",function(event){
    makeSound(event.key);
    flash(event.key);
});

//myfunction
function makeSound(character){
    switch(character){
        case "w":
            var tom1 = new Audio("Sounds/tom-1.mp3");
                tom1.play();
                break;
        case "a":
            var tom2 = new Audio("Sounds/tom-2.mp3");
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("Sounds/tom-3.mp3");
                tom3.play();
                break;
        case "d":
            var tom4 = new Audio("Sounds/tom-4.mp3");
                tom4.play();
                break;
        case "j":
            var snare = new Audio("Sounds/snare.mp3");
                snare.play();
                break;
        case "k":
            var crash = new Audio("Sounds/crash.mp3");
                crash.play();
                break;
        case "l":
            var kick = new Audio("Sounds/kick-bass.mp3");
                kick.play();
                break;

        default: console.log("wrong key is pressed which is wrong");
    }
};

function flash(keySelected){
    var buttonPressed=document.querySelector("."+keySelected);  
    buttonPressed.classList.add("pressed");
    setTimeout(function(){
        buttonPressed.classList.remove("pressed");
    },100);
};