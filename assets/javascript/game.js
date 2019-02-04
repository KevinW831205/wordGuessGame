/*   
UpennLPS HW3 Word Guess Game javascript
Author: Kevin Wang
Date due: 2019/02/09 
*/

var game = {

    //--------- Word bank plus their associated images and audio
    bank: [
        {
            name: "word",
            image: "wordimg",
        },
        {
            name: "letters",
            image: "lettersimg",
        },
        {
            name: "alphabet",
            image: "alphabetimg",
        }],
    //---------

    //-------- Some global variables
    life: 6,
    answer: "",
    word: [],
    wordRNG: 0,
    prevSeed: 0,
    worddisp: "",
    wins: 0,
    losses: 0,
    guessed: [],
    initiated: false,

    //-------



    reset: function () {
        //when game is initiated this should be triggered
        //RNG seed generation + repetition prevention
        while (game.wordRNG === game.prevSeed) {
            game.wordRNG = Math.floor(Math.random() * this.bank.length);
        };

        game.prevSeed = game.wordRNG;
        this.answer = this.bank[game.wordRNG].name;
        this.life = 6;
        game.guessed = [];
        game.word = [];
        game.letterHide();
    },

    checkRepeat: function (input) {
        //input is user typed letter and checks for repeat in what was guessed for both correct and wrong cases

        for (var i = 0; i < game.guessed.length + 1; i++) {
            if (input === game.guessed[i]) {
                return true; //true there is a repeat
            }
        };
        for (var j = 0; j < game.word.length; j++) {
            if (input === game.word[j]) {
                return true;
            }
        }
    },

    letterHide: function () {
        //game.answer is the choosed word by reset function 
        //converts letters of answer to an array of "_" with length equal to word length, and joins to string worddisp for displaying in html 
        for (var i = 0; i < game.answer.length; i++) {
            game.word.push(" _ ");
            game.worddisp = game.word.join("");
        }
    },

    letterCheck: function (input) {
        //function that checks user input to the answer letter by letter and replaces the "_" in word array to the guess if it is correct 
        var correct = false
        for (i = 0; i < game.answer.length; i++) {
            if (input === game.answer[i]) {
                game.word[i] = game.answer[i];
                game.worddisp = game.word.join("");
                correct = true; //guessed correctly
            }
        }
        return correct
    },

    winCheck: function () {
        //check if win condition is met
        var check = true;
        for (var i = 0; i < game.word.length; i++) {
            if (game.word[i] === " _ ") {
                return false;
            }
        }
        return check;
    },


    main: function (userinput) {
        //Press any key to start
        if (game.initiated === false) {
            game.reset();
            game.initiated = true;
            document.getElementById("wordtxt").innerHTML = game.worddisp;
            document.getElementsByClassName("gameWindow").display = "none";
        }

        else {

            // question on /^[a-z]+$]/

            if (/^[a-z]+$/.test(userinput)){ //make sure user inputs lower cased letter
                if (game.checkRepeat(userinput)) {
                    alert("You guessed that letter before try again.")
                } else {
                    if (game.letterCheck(userinput)) {
                    } else {
                        game.guessed.push(userinput);
                        game.life--;
                    }
                }
            }

            //scoreboard update
            lifetxtid = document.getElementById("lifetxt");
            lifetxtid.textContent = game.life;
            document.getElementById("guessedtxt").innerHTML = game.guessed.join(" ");
            document.getElementById("wordtxt").innerHTML = game.worddisp;

            if (game.winCheck()) {
                alert("win")
                game.wins++;
                game.initiated = false;
                wintxtid = document.getElementById("wintxt");
                wintxtid.textContent = game.wins;
                document.getElementById("currentWordtxt").innerHTML = game.bank[game.wordRNG].image;
            };

            if (game.life === 0) {
                game.losses++;
                alert("The correct answer was " + game.answer);
                game.initiated = false;
                losstxtid = document.getElementById("losstxt");
                losstxtid.textContent = game.losses;
            }
        }
    }
}

console.log(game.initiated);

document.onkeyup = function (event) {
    game.main(event.key);
    console.log(game.initiated);
}

/*
document.onkeyup = function (event) {
    var userinput = event.key;

    if (game.initiated === false) {
        game.reset();
        game.initiated = true;
        document.getElementsByClassName("gameWindow").display="none";
    }

    else {

        if (userinput === "a" || userinput === "b" || userinput === "c" || userinput === "d" || userinput === "e" || userinput === "f" || userinput === "g" || userinput === "h" || userinput === "i" || userinput === "j" || userinput === "k" || userinput === "l" || userinput === "m" || userinput === "n" || userinput === "o" || userinput === "p" || userinput === "q" || userinput === "r" || userinput === "s" || userinput === "t" || userinput === "u" || userinput === "v" || userinput === "w" || userinput === "x" || userinput === "y" || userinput === "z") {
            if (game.checkRepeat(userinput)) {
                alert("You guessed that letter before try again.")
            } else {

                if (game.letterCheck(userinput)) {

                } else {
                    game.guessed.push(userinput);
                    game.life--;
                }

            }

        }
        if (game.winCheck()) {
            alert("win")
            game.wins++;
            game.reset();
        };

        if (game.life === 0) {
            game.losses++;
            alert("The correct answer was " + game.answer);
            game.reset();
        }

        var x = "word";
        //scoreboard update
        document.getElementById("currentWordtxt").innerHTML = game.bank[0].img;
        wintxtid = document.getElementById("wintxt");
        wintxtid.textContent = game.wins;
        losstxtid = document.getElementById("losstxt");
        losstxtid.textContent = game.losses;
        lifetxtid = document.getElementById("lifetxt");
        lifetxtid.textContent = game.life;
        document.getElementById("guessedtxt").innerHTML = game.guessed.join(" ");
        document.getElementById("wordtxt").innerHTML = game.worddisp;
    }

    */


