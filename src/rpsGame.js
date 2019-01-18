//Create the Intro Screen

let introWin = document.getElementById("introWin");
let playSpace = document.getElementById("playSpace");
function gameStart() {
  $(introWin).fadeOut(1500, function() {
    $(playSpace).fadeIn(500);
  });
}

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", gameStart);

//Function to select the player's weapon.

$(document).ready(function() {
  $("input:radio[name=playerChoice]").change(function() {
    let value = $(this).val();
    let image_name;
    if (value == "rock") {
      image_name = "src/images/Rock.png";
    } else {
      if (value == "paper") {
        image_name = "src/images/Paper.png";
      } else {
        if (value == "scissors") {
          image_name = "src/images/Scissors.png";
        }
      }
    }
    $("#playerImg").attr("src", image_name);
  });
});

//The game animations and functions begin here.
let weapons = ["Rock", "Paper", "Scissors"];
let compSide = document.getElementById("compSide");
let playPoints = 0;
let compPoints = 0;
function compReveal() {
  let compWeapon = weapons[Math.floor(Math.random() * 3)];
  let compName = document.getElementById("compName");
  let compImg = document.getElementById("compImg");
  compName.innerHTML = compWeapon;
  compImg.src = `src/images/${compWeapon}.png`;

  $(compSide).fadeIn(500, function() {
    let playerScoreNum = document.getElementById("playerScoreNum");
    let compScoreNum = document.getElementById("compScoreNum");
    let playerForm = $("input:radio[name=playerChoice]");
    let playerWeapon = playerForm.filter(":checked").val();
    if (playerWeapon === "rock") {
      if (compWeapon === "Scissors") {
        playPoints++;
      } else if (compWeapon === "Paper") {
        compPoints++;
      } else {
        compPoints + 0; //compWeapon = Rock
      }
    } else if (playerWeapon === "paper") {
      if (compWeapon === "Rock") {
        playPoints++;
      } else if (compWeapon === "Scissors") {
        compPoints++;
      } else {
        compPoints + 0; //compWeapon = Paper
      }
    } else {
      //playerWeapon = scissors
      if (compWeapon == "Rock") {
        compPoints++;
      } else if (compWeapon == "Paper") {
        playPoints++;
      } else {
        compPoints + 0;
      }
    }
    playerScoreNum.innerHTML = playPoints;
    compScoreNum.innerHTML = compPoints;
  });
}

let playerSide = document.getElementById("playerSide");

function playGame() {
  playBtn.syle.opacity = 0;
  let gameAnimate = setInterval(windowSlide, 5);
  let pos = 150;
  function windowSlide() {
    if (pos === 250) {
      clearInterval(gameAnimate);
      compReveal();
    } else {
      pos += 0.5;
      playerSide.style.top = pos + "px";
    }
  }
}

let playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", playGame);

//Reset function begins here.
function playerReset() {
  playBtn.style.opacity = 0;
  let resetAnimate = setInterval(resetSlide, 5);
  let pos = 250;
  function resetSlide() {
    if (pos === 150) {
      clearInterval(resetAnimate);
    } else {
      pos -= 0.5;
      playerSide.style.top = pos + "px";
    }
  }
}

function gameReset() {
  $(compSide).fadeOut(300, playerReset());
}

let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", gameReset);
