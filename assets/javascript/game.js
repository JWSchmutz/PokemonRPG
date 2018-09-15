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
    attack2Icon: $("#vinewhip"),
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
    attack2Icon: $("#ember"),
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
    attack2Icon: $("#bubble"),
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
    attack2Icon: $("#thundershock"),
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
var position
var positionOpponent

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
    usersPokemon.icon.addClass("flipped")
    usersPokemon.icon.animate({ top: "-=37.5%" }, "normal");
    usersPokemon.icon.animate({ left: "-=51.6%" }, "normal");
    pokemon1.icon.animate({ top: "-=25%" }, "normal");
    pokemon2.icon.animate({ top: "+=37.5%" }, "normal");
    pokemon2.icon.animate({ left: "-=17.2%" }, "normal");
    pokemon3.icon.animate({ left: "-=25.8%" }, "normal");
}

function battleCheck() {
    if ((horizontalPosition === 6) && (verticalPosition === 1) && (pokemon1.icon.css('opacity') > 0) ) {
        inBattle = true;
        currentOpponent = pokemon1
        battleReact();
        battleSetup();
        position="position1";
        positionOpponent="positionOpponent1"
    } if ((horizontalPosition === 3) && (verticalPosition === 3) && (pokemon3.icon.css('opacity') > 0)) {
        inBattle = true;
        currentOpponent = pokemon3
        battleReact();
        battleSetup();
        position="position3";
        positionOpponent="positionOpponent3";
    } if ((horizontalPosition === 4) && (verticalPosition === 6) && (pokemon2.icon.css('opacity') > 0)) {
        inBattle = true;
        currentOpponent = pokemon2
        battleReact();
        battleSetup();
        position="position2";
        positionOpponent="positionOpponent2";
    }
};

function battleSetup (){
    $("#gameText").prepend("Health is displayed above.");
    usersPokemon.attack2Icon.removeClass(position)
    currentOpponent.attack2Icon.removeClass(positionOpponent)
    $("#pokemonHP").append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentOpponent.name + "HP = " + currentOpponent.hp);
}

function battleReact(){
    usersPokemon.icon.animate({left:"-=8.6%"}, "fast")
}

function attackAnimation (){
    usersPokemon.icon.animate({left:"+=3.6%"}, "fast")
    usersPokemon.icon.animate({left:"-=3.6%"}, "fast")
}

function specialAnimation (){
    function remakeInvisible(){
        usersPokemon.attack2Icon.addClass("invisible");
    }
    usersPokemon.attack2Icon.addClass(position)
    usersPokemon.attack2Icon.removeClass("invisible")
    setTimeout(remakeInvisible, 1000)
}

function opponentAttackAnimation (){
    currentOpponent.icon.animate({left:"-=3.6%"}, "fast")
    currentOpponent.icon.animate({left:"+=3.6%"}, "fast")
}

function opponentSpecialAnimation (){
    function remakeInvisible(){
        currentOpponent.attack2Icon.addClass("invisible");
    }
    currentOpponent.attack2Icon.addClass(positionOpponent)
    currentOpponent.attack2Icon.removeClass("invisible")
    setTimeout(remakeInvisible, 1000)
}


function opponentAttack() {
    var attackPick = Math.floor(Math.random() * 2)
    if (attackPick === 0) {
        opponentAttackAnimation()
        usersPokemon.hp -= currentOpponent.attack;
        $("#gameText").prepend(currentOpponent.name + " used " + currentOpponent.attack1 + "<br>");
        $("#pokemonHP").prepend(usersPokemon.name + " HP: " + usersPokemon.hp);
    } if (attackPick === 1) {
        opponentSpecialAnimation();
        if((currentOpponent===charmander)&&(usersPokemon===squirtle)){usersPokemon.hp -= currentOpponent.special;
        } else if (((usersPokemon===squirtle)&&(currentOpponent===bulbasaur||pikachu))||((usersPokemon===bulbasaur)&&(currentOpponent===charmander))||((usersPokemon===charmander)&&(currentOpponent===squirtle))){
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
            $("#gameText").html("");
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
            usersPokemon.icon.animate({left:"+=8.6%"}, "normal")
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
    if ((inBattle === true)&&($("#thundershock").hasClass("invisible"))&&
    ($("#vinewhip").hasClass("invisible"))&&
    ($("#bubble").hasClass("invisible"))&&
    ($("#ember").hasClass("invisible")))
    {
        if (e.key === "a") {
            currentOpponent.hp -= usersPokemon.attack;
            $("#gameText").html("");
            $("#gameText").prepend(usersPokemon.name + " used " + usersPokemon.attack1 + "<br>");
            attackAnimation();
            $("#pokemonHP").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentOpponent.name + "HP = " + currentOpponent.hp);
            opponentAttack();
            setTimeout(checkForKO, 1000)
        } if (e.key === "s") {
            if((usersPokemon===charmander)&&(currentOpponent===squirtle)){currentOpponent.hp -= usersPokemon.special;
            } else if (((usersPokemon === bulbasaur || pikachu) && (currentOpponent === squirtle)) || ((usersPokemon === charmander) && (currentOpponent === bulbasaur)) || ((usersPokemon === squirtle) && (currentOpponent === charmander))) {
                currentOpponent.hp -= usersPokemon.special*2;
            } else {
                currentOpponent.hp -= usersPokemon.special;}
                $("#gameText").html("");
                $("#gameText").prepend(usersPokemon.name + " used " + usersPokemon.attack2 + "<br>");
                specialAnimation();
                $("#pokemonHP").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentOpponent.name + "HP = " + currentOpponent.hp);
                opponentAttack();
                setTimeout(checkForKO, 1000)
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
