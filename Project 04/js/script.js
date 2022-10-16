var noOfBottles =99;
function sayLyrics(){
    while(noOfBottles>=1){
        console.log(noOfBottles+" bottles of beer on the wall,"+noOfBottles+"bottles of beer");
        console.log("Take it down pass it around,"+(noOfBottles-1)+"bottles of beer on the wall");
        noOfBottles--;
    }
}