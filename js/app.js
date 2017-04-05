$( document ).ready(function() {
  console.log( 'ready!' );
  //
  const $start = $('#start');
  const colours = ['red', 'green', 'blue', 'orange', 'yellow'];
  const text = ['RED', 'GREEN', 'BLUE', 'ORANGE', 'YELLOW'];
  let colourArray = [];
  const $timer = $('#timer');
  const $resetBtn = $timer.find('#startAgain');
  const $timerScreen = $timer.find('.screen');
  let timeRemaining = 10;
  let timerIsRunning = false;
  let timerId;
  const answerSequence = [];


  const coloursObject = {
    'red': 'rgb(255, 0, 0)',
    'green': 'rgb(0, 128, 0)',
    'yellow': 'rgb(255, 255, 0)',
    'blue': 'rgb(0, 0, 255)',
    'orange': 'rgb(255, 165, 0)'
  };


  function startGame() {
    colourArray = [];
    $('.grid').each(function(index) {
      var colour = colours[Math.floor(Math.random() * colours.length)];
      $('.grid').eq(index).css('backgroundColor', '' + colour);
      colourArray.push(colour);
    });
    const colourToPress = colourArray[Math.floor(Math.random() * colourArray.length)];
    $('.message').text(colourToPress);
    timerStart();
  }

  function timerStart() {
    if (timerIsRunning) {
      timerIsRunning = false;
      return clearInterval(timerId);
    } else {
      timerIsRunning = true;
      timerId = setInterval(countdownStart, 1000);
    }
    addClickEvents();
  }

  function countdownStart() {
    timeRemaining--;
    $timerScreen.text(timeRemaining);
    if (timeRemaining === 0) {
      clearInterval(timerId);
      // setTimeout(, 3000);
    }
  }

  function addClickEvents() {
    const colourSequence = $('.grid');
    const colours = $('.message').text();
    const colourToCheck = getCorrectColour(colours);
    colourSequence.each(function(i, element) {
      let circleColour = $(element).css('background-color');
      if (circleColour === colourToCheck) {
        answerSequence.push($(element).attr('id'));
      }
    });
    $('body').keypress(squareClicked);
  }

  function getCorrectColour(colour) {
    var correctColour = '';
    for (var key in coloursObject) {
      if (key === colour) {
        correctColour += coloursObject[key];
      }
    }
    return correctColour;
  }

  function squareClicked(e) {
    let keyPressed = e.keyCode.toString();
    if (answerSequence.indexOf(keyPressed) > -1) {
      console.log(answerSequence.indexOf(keyPressed));
    } else {
      console.log('Game Over');
    }
  }
// how i am going to determine when all the correct keys have been pressed from the array.

// determine what to do if a player presses the wrong key
function gameOver () {

}


  // When the sequence of colours is created, g

  // function highScore() {
  //   var score = 0;
  //   var highscore = localStorage.getItem('highscore');
  //   if(highscore !== null){
  //     if (score > highscore) {
  //       localStorage.setItem('highscore', score);
  //     }
  //   } else {
  //     localStorage.setItem('highscore', score);
  //   }
  // }

  function resetTimer() {
    clearInterval(timerId);
    $timer.removeClass('ringing');
    timeRemaining = 10;
    timerIsRunning = false;
    $timerScreen;
  }

  $resetBtn.on('click', resetTimer);
  $start.on('click', startGame);
});
