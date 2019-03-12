//variables
//--------------------------------------------------------------
var winCondition = 0;
var inBattle = false;
var hasChosenPokemon = false;
var usersPokemon;
var bulbasaur = {
  name: "Bulbasaur",
  icon: $("#bulbasaur"),
  hp: 45,
  startingHp: 45,
  attack1: "Tackle",
  attack2: "Vine Whip",
  attack2Icon: $("#vinewhip"),
  speed: 45,
  attack: 7,
  special: 9
};
var charmander = {
  name: "Charmander",
  icon: $("#charmander"),
  hp: 39,
  startingHp: 39,
  attack1: "Scratch",
  attack2: "Ember",
  attack2Icon: $("#ember"),
  speed: 65,
  attack: 8,
  special: 8
};
var squirtle = {
  name: "Squirtle",
  icon: $("#squirtle"),
  hp: 44,
  startingHp: 44,
  attack1: "Tackle",
  attack2: "Bubble",
  attack2Icon: $("#bubble"),
  speed: 43,
  attack: 7,
  special: 8
};
var pikachu = {
  name: "Pikachu",
  icon: $("#pikachu"),
  hp: 35,
  startingHp: 35,
  attack1: "Quick Attack",
  attack2: "Thunder Shock",
  attack2Icon: $("#thundershock"),
  speed: 90,
  attack: 8,
  special: 8
};
var verticalPosition = 0;
var horizontalPosition = 0;
var pokemon1;
var pokemon2;
var pokemon3;
var currentOpponent;
var position;
var positionOpponent;

// functions
//--------------------------------------------------------------

function groupPokemon() {
  //move bulbasaur
  bulbasaur.icon.animate({ top: "+=12.5%" }, "normal");
  bulbasaur.icon.animate({ left: "+=8.6%" }, "normal");
  //move charmander
  charmander.icon.animate({ top: "+=12.5%" }, "normal");
  charmander.icon.animate({ left: "-=8.6%" }, "normal");
  //move squirtle
  squirtle.icon.animate({ top: "-=12.5%" }, "normal");
  squirtle.icon.animate({ left: "+=8.6%" }, "normal");
  //move pikachu
  pikachu.icon.animate({ top: "-=12.5%" }, "normal");
  pikachu.icon.animate({ left: "-=8.6%" }, "normal");
}

function dispersePokemon() {
  //display chosen pokemon's stats and disperse them.
  $("#pokemonHP").removeClass("invisible");
  $("#hp-text").prepend(usersPokemon.name + " HP: " + usersPokemon.hp);
  $("#attacks").prepend(
    '<button id="physical-button" class="pokemon-small attack-button"> <h4 class="button-text">' +
      usersPokemon.attack1 +
      "</h4></button>" +
      '<button id="special-button" class="pokemon-small attack-button"> <h4 class="button-text">' +
      usersPokemon.attack2 +
      "</h4></button>"
  );
  // $("#attack3").prepend("c) " + usersPokemon.attack3);
  hasChosenPokemon = true;
  usersPokemon.icon.addClass("flipped");
  usersPokemon.icon.animate({ top: "-=37.5%" }, "normal");
  usersPokemon.icon.animate({ left: "-=51.6%" }, "normal");
  pokemon1.icon.animate({ top: "-=25%" }, "normal");
  pokemon2.icon.animate({ top: "+=37.5%" }, "normal");
  pokemon2.icon.animate({ left: "-=17.2%" }, "normal");
  pokemon3.icon.animate({ left: "-=25.8%" }, "normal");
}

function battleCheck() {
  if (
    horizontalPosition === 6 &&
    verticalPosition === 1 &&
    pokemon1.icon.css("opacity") > 0 &&
    pokemon1.hp > 0
  ) {
    inBattle = true;
    currentOpponent = pokemon1;
    battleReact();
    battleSetup();
    position = "position1";
    positionOpponent = "positionOpponent1";
  }
  if (
    horizontalPosition === 3 &&
    verticalPosition === 3 &&
    pokemon3.icon.css("opacity") > 0 &&
    pokemon3.hp > 0
  ) {
    inBattle = true;
    currentOpponent = pokemon3;
    battleReact();
    battleSetup();
    position = "position3";
    positionOpponent = "positionOpponent3";
  }
  if (
    horizontalPosition === 4 &&
    verticalPosition === 6 &&
    pokemon2.icon.css("opacity") > 0 &&
    pokemon2.hp > 0
  ) {
    inBattle = true;
    currentOpponent = pokemon2;
    battleReact();
    battleSetup();
    position = "position2";
    positionOpponent = "positionOpponent2";
  }
}

function battleSetup() {
  usersPokemon.attack2Icon.removeClass(position);
  currentOpponent.attack2Icon.removeClass(positionOpponent);

  $("#opponentHP").removeClass("invisible");
  var opponentPercentHealth =
    (100 * currentOpponent.hp) / currentOpponent.startingHp;
  $("#opponent-hp-text").html(
    currentOpponent.name + " HP: " + currentOpponent.hp
  );
  console.log(opponentPercentHealth);
  $("#opponent-current-hp").css("width", opponentPercentHealth + "%");
  $("#out-of-battle-text").addClass("removed");
  $("#in-battle-text").removeClass("removed");
}

function battleReact() {
  usersPokemon.icon.animate({ left: "-=8.6%" }, "fast");
}

function attackAnimation() {
  usersPokemon.icon.animate({ left: "+=3.6%" }, "fast");
  usersPokemon.icon.animate({ left: "-=3.6%" }, "fast");
}

function specialAnimation() {
  function remakeInvisible() {
    usersPokemon.attack2Icon.addClass("invisible");
  }
  usersPokemon.attack2Icon.addClass(position);
  usersPokemon.attack2Icon.removeClass("invisible");
  setTimeout(remakeInvisible, 1000);
}

function opponentAttackAnimation() {
  currentOpponent.icon.animate({ left: "-=3.6%" }, "fast");
  currentOpponent.icon.animate({ left: "+=3.6%" }, "fast");
}

function opponentSpecialAnimation() {
  function remakeInvisible() {
    currentOpponent.attack2Icon.addClass("invisible");
  }
  currentOpponent.attack2Icon.addClass(positionOpponent);
  currentOpponent.attack2Icon.removeClass("invisible");
  setTimeout(remakeInvisible, 1000);
}

function opponentAttack() {
  var attackPick = Math.floor(Math.random() * 2);
  if (attackPick === 0) {
    opponentAttackAnimation();
    usersPokemon.hp -= currentOpponent.attack;
  }
  if (attackPick === 1) {
    opponentSpecialAnimation();
    if (currentOpponent === charmander && usersPokemon === squirtle) {
      usersPokemon.hp -= currentOpponent.special;
    } else if (
      (usersPokemon === squirtle &&
        (currentOpponent === bulbasaur || pikachu)) ||
      (usersPokemon === bulbasaur && currentOpponent === charmander) ||
      (usersPokemon === charmander && currentOpponent === squirtle)
    ) {
      usersPokemon.hp -= 2 * currentOpponent.special;
    } else {
      usersPokemon.hp -= currentOpponent.special;
    }
  }
  var percentHealth =
    (100 * usersPokemon.hp) / (usersPokemon.startingHp + 5 * winCondition);
  $("#hp-text").html(usersPokemon.name + " HP: " + usersPokemon.hp);
  console.log(percentHealth);
  $("#current-hp").css("width", percentHealth + "%");
}

function checkForKO() {
  if (usersPokemon.hp <= 0) {
    $(usersPokemon.icon).animate({ opacity: 0 });
    $("#modal-outcome").text("Defeat!");
    $("#modal-text").text("Click the button to try again!");
    $(".modal, #restart-button, .grayout").removeClass("removed");
    $(".modal").addClass("flex");
    $("#continue-button").addClass("removed");
  } else if (currentOpponent.hp <= 0) {
    winCondition++;
    if (winCondition === 3) {
      $("#modal-outcome").text("Victory!");
      $("#modal-text").text(
        "You win the game.  Click the button to play again!"
      );
      $(".modal, #restart-button, .grayout").removeClass("removed");
      $(".modal").addClass("flex");
      $("#continue-button").addClass("removed");
    } else {
      $(currentOpponent.icon).animate({ opacity: 0 });

      $("#opponentHP").addClass("invisible");
      $("#modal-outcome").text("Victory!");
      $("#modal-text").text(
        "You leveled up!  " + usersPokemon.name + " has been fully healed!"
      );
      $(".modal, .grayout").removeClass("removed");
      $(".modal").addClass("flex");
      usersPokemon.attack++;
      usersPokemon.special++;
      usersPokemon.hp = usersPokemon.startingHp + 5 * winCondition;
      var percentHealth =
        (100 * usersPokemon.hp) / (usersPokemon.startingHp + 5 * winCondition);
      $("#hp-text").html(usersPokemon.name + " HP: " + usersPokemon.hp);
      console.log(percentHealth);
      $("#current-hp").css("width", percentHealth + "%");
      inBattle = false;
      usersPokemon.icon.animate({ left: "+=8.6%" }, "normal");
    }
  }
}

function move(e) {
  var xCenter =
    (usersPokemon.icon.position().left * 2 +
      $("#checkerBoard").position().left * 2 +
      usersPokemon.icon.width()) /
    2;
  var yCenter =
    (usersPokemon.icon.position().top * 2 +
      $("#checkerBoard").position().top * 2 +
      usersPokemon.icon.height()) /
    2;
  var leftBid = xCenter - e.clientX;
  var rightBid = e.clientX - xCenter;
  var downBid = e.clientY - yCenter;
  var upBid = yCenter - e.clientY;
  if (inBattle === false && usersPokemon !== undefined) {
    var direction = Math.max(leftBid, rightBid, upBid, downBid);
    if (direction === leftBid && horizontalPosition > 0) {
      moveLeft();
    }
    if (direction === upBid && verticalPosition > 0) {
      moveUp();
    }
    if (direction === rightBid && horizontalPosition < 7) {
      moveRight();
    }
    if (direction === downBid && verticalPosition < 7) {
      moveDown();
    }
    battleCheck();
  }
}

function moveLeft() {
  horizontalPosition--;
  usersPokemon.icon.animate({ left: "-=8.6%" }, 300);
}

function moveUp() {
  verticalPosition--;
  usersPokemon.icon.animate({ top: "-=12.5%" }, 300);
}

function moveRight() {
  horizontalPosition++;
  usersPokemon.icon.animate({ left: "+=8.6%" }, 300);
}

function moveDown() {
  verticalPosition++;
  usersPokemon.icon.animate({ top: "+=12.5%" }, 300);
}

function restartGame() {
  location.reload();
}

function continueGame() {
  $(".modal, .grayout").addClass("removed");
  $(".modal").removeClass("flex");
}

function physicalAttack() {
  currentOpponent.hp -= usersPokemon.attack;
  attackAnimation();
  var opponentPercentHealth =
    (100 * currentOpponent.hp) / currentOpponent.startingHp;
  $("#opponent-hp-text").html(
    currentOpponent.name + " HP: " + currentOpponent.hp
  );
  console.log(opponentPercentHealth);
  $("#opponent-current-hp").css("width", opponentPercentHealth + "%");
  opponentAttack();
  setTimeout(checkForKO, 1000);
}

function specialAttack() {
  if (usersPokemon === charmander && currentOpponent === squirtle) {
    currentOpponent.hp -= usersPokemon.special;
  } else if (
    ((usersPokemon === bulbasaur || pikachu) && currentOpponent === squirtle) ||
    (usersPokemon === charmander && currentOpponent === bulbasaur) ||
    (usersPokemon === squirtle && currentOpponent === charmander)
  ) {
    currentOpponent.hp -= usersPokemon.special * 2;
  } else {
    currentOpponent.hp -= usersPokemon.special;
  }
  specialAnimation();
  var opponentPercentHealth =
    (100 * currentOpponent.hp) / currentOpponent.startingHp;
  $("#opponent-hp-text").html(
    currentOpponent.name + " HP: " + currentOpponent.hp
  );
  console.log(opponentPercentHealth);
  $("#opponent-current-hp").css("width", opponentPercentHealth + "%");
  opponentAttack();
  setTimeout(checkForKO, 1000);
}

//logic
//--------------------------------------------------------------
//moving by arrow keys
$(document).keyup(function(e) {
  if (inBattle === false && usersPokemon !== undefined) {
    if (e.keyCode === 37 && horizontalPosition > 0) {
      moveLeft();
    }
    if (e.keyCode === 38 && verticalPosition > 0) {
      moveUp();
    }
    if (e.keyCode === 39 && horizontalPosition < 7) {
      moveRight();
    }
    if (e.keyCode === 40 && verticalPosition < 7) {
      moveDown();
    }
    battleCheck();
  }
});

//moving by clicking
$("#checkerBoardImg").click(move);

//attacking
$(document).keyup(function(e) {
  if (
    inBattle === true &&
    $("#thundershock").hasClass("invisible") &&
    $("#vinewhip").hasClass("invisible") &&
    $("#bubble").hasClass("invisible") &&
    $("#ember").hasClass("invisible")
  ) {
    if (e.key === "a" || e.key === "A") {
      physicalAttack();
    }
    if (e.key === "s" || e.key === "S") {
      specialAttack();
    }
  }
});

// attacking with buttons
$(document).on("click", ".attack-button", function() {
  if (
    inBattle === true &&
    $("#thundershock").hasClass("invisible") &&
    $("#vinewhip").hasClass("invisible") &&
    $("#bubble").hasClass("invisible") &&
    $("#ember").hasClass("invisible")
  ) {
    if ($(this).attr("id") === "physical-button") {
      physicalAttack();
    }
    if ($(this).attr("id") === "special-button") {
      specialAttack();
    }
  }
});

$(".character").click(function(e) {
  if (hasChosenPokemon === true) {
    move(e);
    //otherwise, make selectted the users pokemon and move it to the top left
  } else {
    $("#starting-text").addClass("removed");
    $("#out-of-battle-text").removeClass("removed");

    idOfSelected = $(this).attr("id");
    switch (idOfSelected) {
      case "bulbasaur":
        pokemon1 = charmander;
        pokemon2 = squirtle;
        pokemon3 = pikachu;
        usersPokemon = bulbasaur;
        break;
      case "charmander":
        pokemon1 = bulbasaur;
        pokemon2 = squirtle;
        pokemon3 = pikachu;
        usersPokemon = charmander;
        break;
      case "squirtle":
        pokemon1 = charmander;
        pokemon2 = bulbasaur;
        pokemon3 = pikachu;
        usersPokemon = squirtle;
        break;
      default:
        pokemon1 = charmander;
        pokemon2 = squirtle;
        pokemon3 = bulbasaur;
        usersPokemon = pikachu;
    }
    groupPokemon();
    dispersePokemon();
  }
});

$("#restart-button").click(restartGame);

$("#continue-button").click(continueGame);

document.onkeyup = function(event) {
  if (event.keyCode === 13 && $("#restart-button").hasClass("removed")) {
    continueGame();
  } else if (
    event.keyCode === 13 &&
    $("#continue-button").hasClass("removed")
  ) {
    restartGame();
  }
};
