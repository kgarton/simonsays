
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern= [];
var level = 0;
var started = false;


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}

$(".btn").click("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress("keypress", function(event){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function playSound(name){
  var audio = new Audio('sounds/'+name+".mp3");
  audio.play();

}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart!");
    startOver();


  }

}

function startOver() {
  level = 0;
  gamePattern=[];
  started = false;
}
