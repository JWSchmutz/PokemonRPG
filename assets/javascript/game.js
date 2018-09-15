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
    attack1: "Tackle",
    attack2: "Vine Whip",
    // attack3: "Leech Seed",
    speed: 45,
    attack: 7,
    special: 9
};
var charmander = {
    name: "Charmander",
    icon: $("#charmander"),
    hp: 39,
    attack1: "Scratch",
    attack2: "Ember",
    // attack3: "Growl",
    speed: 65,
    attack: 8,
    special: 8
};
var squirtle = {
    name: "Squirtle",
    icon: $("#squirtle"),
    hp: 44,
    attack1: "Tackle",
    attack2: "Bubble",
    // attack3: "Tail Whip",
    speed: 43,
    attack: 7,
    special: 8
};
var pikachu = {
    name: "Pikachu",
    icon: $("#pikachu"),
    hp: 35,
    attack1: "Quick Attack",
    attack2: "Thundershock",
    // attack3: "Thunder Wave",
    speed: 90,
    attack: 8,
    special: 8
};
var verticalPosition = 0;
var horizontalPosition = 0;
var pokemon1
var pokemon2
var pokemon3
var currentOpponent

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
    $("#pokemonHP").prepend(usersPokemon.name + " HP: " + usersPokemon.hp);
    $("#attacks").prepend("Attacks:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a) " + usersPokemon.attack1 + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; s) " + usersPokemon.attack2);
    // $("#attack3").prepend("c) " + usersPokemon.attack3);
    hasChosenPokemon = true;
    usersPokemon.icon.animate({ top: "-=37.5%" }, "normal");
    usersPokemon.icon.animate({ left: "-=51.6%" }, "normal");
    pokemon1.icon.animate({ top: "-=25%" }, "normal");
    pokemon2.icon.animate({ top: "+=37.5%" }, "normal");
    pokemon2.icon.animate({ left: "-=17.2%" }, "normal");
    pokemon3.icon.animate({ left: "-=25.8%" }, "normal");
}

function battleCheck() {
    if ((horizontalPosition === 6) && (verticalPosition === 1)) {
        inBattle = true;
        currentOpponent = pokemon1
        $("#gameText").prepend("Health is displayed above.");
    } if ((horizontalPosition === 3) && (verticalPosition === 3)) {
        inBattle = true;
        currentOpponent = pokemon3
        $("#gameText").prepend("Health is displayed above.");
    } if ((horizontalPosition === 4) && (verticalPosition === 6)) {
        inBattle = true;
        currentOpponent = pokemon2
        $("#gameText").prepend("Health is displayed above.");
    }
};

function opponentAttack() {
    var attackPick = Math.floor(Math.random() * 2)
    if (attackPick === 0) {
        usersPokemon.hp -= currentOpponent.attack;
        $("#gameText").prepend(currentOpponent.name + " used " + currentOpponent.attack1 + "<br>");
        $("#pokemonHP").prepend(usersPokemon.name + " HP: " + usersPokemon.hp);
    } if (attackPick === 1) {
        if (((usersPokemon === bulbasaur) && (currentOpponent === charmander)) || ((usersPokemon === charmander) && (currentOpponent === squirtle)) || ((usersPokemon === squirtle) && (currentOpponent === bulbasaur || pikachu))) {
            usersPokemon.hp -= 2 * currentOpponent.special;
        } else {
            usersPokemon.hp -= currentOpponent.special;}
            $("#gameText").prepend(currentOpponent.name + " used " + currentOpponent.attack2 + "<br>");
            $("#pokemonHP").prepend(usersPokemon.name + " HP: " + usersPokemon.hp);
        }
    }


function checkForKO() {
    if (usersPokemon.hp <= 0) {
        $(usersPokemon.icon).animate({ opacity: 0 });
        alert("Failure!");
        location.reload();
    } else if (currentOpponent.hp <= 0) {
        winCondition++
        if (winCondition === 3) {
            alert("Victory!  You win!")
            location.reload();
        } else {
            $(currentOpponent.icon).animate({ opacity: 0 });
            alert("Victory!  You have been fully healed.");
            alert("Congratulations!  You have grown a level.");

            usersPokemon.attack++;
            usersPokemon.special++;
            if (usersPokemon === bulbasaur) {
                usersPokemon.hp = 45 + 5 * winCondition
            }
            if (usersPokemon === charmander) {
                usersPokemon.hp = 39 + 5 * winCondition
            }
            if (usersPokemon === squirtle) {
                usersPokemon.hp = 44 + 5 * winCondition
            }
            if (usersPokemon === pikachu) {
                usersPokemon.hp = 35 + 5 * winCondition
            }
            $("#pokemonHP").html(usersPokemon.name + " HP: " + usersPokemon.hp);
            inBattle = false;
        }
    }
}

//logic
//--------------------------------------------------------------
//moving
$(document).keyup(function (e) {
    if ((inBattle === false) && (usersPokemon !== undefined)) {
        if ((e.keyCode === 37) && (horizontalPosition > 0)) {
            horizontalPosition--;
            usersPokemon.icon.animate({ left: "-=8.6%" }, "normal");
        } if ((e.keyCode === 38) && (verticalPosition > 0)) {
            verticalPosition--;
            usersPokemon.icon.animate({ top: "-=12.5%" }, "normal");
        } if ((e.keyCode === 39) && (horizontalPosition < 7)) {
            horizontalPosition++;
            usersPokemon.icon.animate({ left: "+=8.6%" }, "normal");
        } if ((e.keyCode === 40) && (verticalPosition < 7)) {
            verticalPosition++;
            usersPokemon.icon.animate({ top: "+=12.5%" }, "normal");
        }
        battleCheck();
    }
});
//attacking
$(document).keyup(function (e) {
    if (inBattle === true) {
        $("#currentOpponentHP").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentOpponent.name + " HP: " + currentOpponent.hp);
        if (e.key === "a") {
            currentOpponent.hp -= usersPokemon.attack;
            $("#gameText").html("");
            $("#gameText").prepend(usersPokemon.name + " used " + usersPokemon.attack1 + "<br>");
            $("#pokemonHP").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentOpponent.name + "'s health = " + currentOpponent.hp);
            opponentAttack();
            checkForKO();
        } if (e.key === "s") {
            if (((usersPokemon === bulbasaur || pikachu) && (currentOpponent === squirtle)) || ((usersPokemon === charmander) && (currentOpponent === bulbasaur)) || ((usersPokemon === squirtle) && (currentOpponent === charmander))) {
                currentOpponent.hp -= usersPokemon.special*2;
            } else {
                currentOpponent.hp -= usersPokemon.special;}
                $("#gameText").html("");
                $("#gameText").prepend(usersPokemon.name + " used " + usersPokemon.attack2 + "<br>");
                $("#pokemonHP").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentOpponent.name + "'s health = " + currentOpponent.hp);
                opponentAttack();
                checkForKO();
            }
        }
    }
);


//selecting bulbasaur
$("#bulbasaur").click(function () {
    //if user has already chosen a pokemon, tell them they can't choose another
    if (hasChosenPokemon === true) {
        $("#gameText").prepend("You cannot select a Pokemon at this time.");
        //otherwise, make selectted the users pokemon and move it to the top left
    } else {
        usersPokemon = bulbasaur;
        pokemon1 = charmander;
        pokemon2 = squirtle;
        pokemon3 = pikachu;
        groupPokemon()
        dispersePokemon();
    }
});

//selecting charmander
$("#charmander").click(function () {
    //if user has already chosen a pokemon, tell them they can't choose another
    if (hasChosenPokemon === true) {
        $("#gameText").prepend("You cannot select a Pokemon at this time.");
        //otherwise, make selectted the users pokemon and move it to the top left
    } else {
        usersPokemon = charmander;
        pokemon1 = bulbasaur;
        pokemon2 = squirtle;
        pokemon3 = pikachu;
        groupPokemon()
        dispersePokemon();
    }
});

//selecting squirtle
$("#squirtle").click(function () {
    //if user has already chosen a pokemon, tell them they can't choose another
    if (hasChosenPokemon === true) {
        $("#gameText").prepend("You cannot select a Pokemon at this time.");
        //otherwise, make selectted the users pokemon and move it to the top left
    } else {
        usersPokemon = squirtle;
        pokemon1 = charmander;
        pokemon2 = bulbasaur;
        pokemon3 = pikachu;
        groupPokemon()
        dispersePokemon();
        hasChosenPokemon = true;
    }
});

//selecting pikachu
$("#pikachu").click(function () {
    //if user has already chosen a pokemon, tell them they can't choose another
    if (hasChosenPokemon === true) {
        $("#gameText").prepend("You cannot select a Pokemon at this time.");
        //otherwise, make selectted the users pokemon and move it to the top left
    } else {
        usersPokemon = pikachu;
        pokemon1 = charmander;
        pokemon2 = squirtle;
        pokemon3 = bulbasaur;
        groupPokemon()
        dispersePokemon();
    }
});



//get in battle
//perform battle
    //attacks
    //effects
    //hp changes
    //disappear
//win
//lose


//tackle:7
//scratch: 8
//vinewhip:8
//bubble: 7
//ember: 7
//quick attack: 8
//thundershock: 8