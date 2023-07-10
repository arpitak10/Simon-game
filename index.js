var userClickedPattern = [];

var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var level = 0;

var start = false;

//jquery to detect keyPress 
$(document).keypress(function(){
  if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start=true;
  }
});

//to trigger the function
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
   // console.log("wrong");
   playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    
  }
}
function startOver(){
  level = 0;
  start = false;
  gamePattern = [];

}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
  
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);   

}

function playSound(name){
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();

}

function animatePress(currentColor){
    //var className = "btn "+currentColor;
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
}



//nextSequence();

