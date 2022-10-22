for(var i =0 ; i<document.querySelectorAll(".drum").length;i++){

    document.querySelectorAll("button")[i].addEventListener("click", function (){
        alert("I am being pressed");
    });
}