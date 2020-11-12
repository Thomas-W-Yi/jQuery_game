// alert('hello')

var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(() => {
  if (started === false) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(`this is gamePattern: ${gamePattern}`);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(`${randomChosenColour}`);
  level++;
  $('h1').text(`level ${level}`);
}

$('.btn').click((event) => {
  var userChosenColour = event.target.id;
  playSound(`${userChosenColour}`);
  userClickedPattern.push(userChosenColour);
  console.log(`this is userClickedPattern: ${userClickedPattern}`);
  animatePress(userChosenColour);
  var index = userClickedPattern.length - 1;
  console.log(`this is the current index: ${index}`);
  checkAnswer(index);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
      userClickedPattern = [];
    }
  } else {
    console.log('wrong');
    $('h1').text('Game Over, Press Any Key to Restart');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColour}`).removeClass('pressed');
  }, 100);
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}
