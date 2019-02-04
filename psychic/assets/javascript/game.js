/*   
UpennLPS HW3 Psychic game javascript
Author: Kevin Wang
Date due: 2019/02/09 
*/

var game = {
    bank: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    life: 8,
    answer: "",
    wins: 0,
    losses: 0,
    guessed: [],
    reset: function () {
        //RNG letter choice
        this.answer = this.bank[Math.floor(Math.random() * this.bank.length)];
        this.life = 8;
        game.guessed = [];
    },

    checkRepeat: function (input) {
        for (var i = 0; i < game.guessed.length + 1; i++) {
            if (input === game.guessed[i]) {
                return true;
            }
        }
    }

};


game.reset();





document.onkeyup = function (event) {
    var userinput = event.key;

  

//    if (userinput === "a" || userinput === "b" || userinput === "c" || userinput === "d" || userinput === "e" || userinput === "f" || userinput === "g" || userinput === "h" || userinput === "i" || userinput === "j" || userinput === "k" || userinput === "l" || userinput === "m" || userinput === "n" || userinput === "o" || userinput === "p" || userinput === "q" || userinput === "r" || userinput === "s" || userinput === "t" || userinput === "u" || userinput === "v" || userinput === "w" || userinput === "x" || userinput === "y" || userinput === "z") {


    if (/^[a-z]+$/.test(userinput)) {
        if (userinput === game.answer) {
            game.wins++;
            alert("you guessed correcty");
            game.reset();
        } else if (game.checkRepeat(userinput)) {
            alert("you guessed that before try again");
        } else {
            game.life--;
            game.guessed.push(userinput);
        }
    }
    if (game.life === 0) {
        game.losses++;
        alert("The correct answer was " + game.answer);
        game.reset();

    }

    //scoreboard update
    wintxtid = document.getElementById("wintxt");
    wintxtid.textContent = game.wins;
    losstxtid = document.getElementById("losstxt");
    losstxtid.textContent = game.losses;
    lifetxtid = document.getElementById("lifetxt");
    lifetxtid.textContent = game.life;
    document.getElementById("guessedtxt").innerHTML = game.guessed;

}