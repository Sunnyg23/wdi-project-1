$( document ).ready(function() {
  console.log( 'ready!' );
  const $start = $('.start');
  const colours = ['red', 'green', 'blue', 'orange', 'yellow'];
  const text = ['RED', 'GREEN', 'BLUE', 'ORANGE', 'YELLOW'];
  let colourArray = [];
  const $timer = $('#timer');
  const $resetBtn = $timer.find('#startAgain');
  const $timerScreen = $('.timer span');
  let timeRemaining = 10;
  let level = 0;
  let timerIsRunning = false;
  let timerId;
  let answerSequence = [];
  // let restart = document.querySelector('#reset');
  let score = 0;

  const coloursObject = {
    'red': 'rgb(255, 0, 0)',
    'green': 'rgb(0, 128, 0)',
    'yellow': 'rgb(255, 255, 0)',
    'blue': 'rgb(0, 0, 255)',
    'orange': 'rgb(255, 165, 0)'
  };


  function startGame() {
    $(this).html('Reset');
    $(this).one('click', resetGame);


    timerIsRunning = false;
    colourArray = [];
    answerSequence = [];
    $timerScreen.text(timeRemaining);
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
    if (timerIsRunning === true) {
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
    console.log(answerSequence);
    if (timeRemaining === 0) {
      clearInterval(timerId);
      if (answerSequence.length === 0){
        levelUp();
      } else {
        gameOver();
      }
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
        console.log(answerSequence);
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
    console.log('pressed');
    let keyPressed = e.keyCode.toString();
    if (answerSequence.indexOf(keyPressed) > -1) {
      var index = answerSequence.indexOf(keyPressed);
      answerSequence.splice(index, 1);
      $('.score span').text(score += 10);
      if (answerSequence.length === 0 && timeRemaining === 0) {
        levelUp();
      }
    } else {
      gameOver();
    }
  }

  function resetGame() {
    $(this).html('Start');
    $(this).one('click', startGame);


    clearInterval(timerId);
    colourArray = [];
    answerSequence = [];
    timeRemaining = 10;
    $timerScreen.text(timeRemaining);
    $('body').off('keypress', squareClicked);
    $('li.message').html('?');
    $('li.grid').css('background-color', '#eee')
  }

  function gameOver () {
    clearInterval(timerId);
    colourArray = [];
    answerSequence = [];
    timeRemaining = 10;
    $timerScreen.text(timeRemaining);
    $('body').off('keypress', squareClicked);
    $('.screen').text('Game Over');
  }


  function resetTimer() {
    clearInterval(timerId);
    $timer.removeClass('ringing');
    timeRemaining = 10;
    timerIsRunning = false;
    $timerScreen;
  }

  function levelUp()  {
    level++;
    $('.screen').text('Level Up!');
    setTimeout(() => $('.screen').text('Get Ready...'), 1000);
    levelCheck();
    $('body').off('keypress', squareClicked);
  }

  function levelCheck() {

    if (level === 1) {
      timeRemaining = 8;
      $timerScreen.text(timeRemaining);
      setTimeout(startGame, 3000);
    } else if (level === 2) {
      timeRemaining = 6;
      $timerScreen.text(timeRemaining);
      setTimeout(startGame, 3000);
    } else if (level === 3) {
      timeRemaining = 4;
      $timerScreen.text(timeRemaining);
      setTimeout(startGame, 3000);
    } else if (level === 4) {
      timeRemaining = 2;
      $timerScreen.text(timeRemaining);
      setTimeout(startGame, 3000);
    }
  }

  // $resetBtn.on('click', resetTimer);
  $start.one('click', startGame);
});
