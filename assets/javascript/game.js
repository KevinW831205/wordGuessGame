/*   
UpennLPS HW3 Word Guess Game javascript
Author: Kevin Wang
Date due: 2019/02/09 
*/


var game = {

    /*
    --------- Word bank plus their associated images and audio
        Syntax:
        {
           name:""      take a string, drop the punctuations empty spaces are ok
           image:""     string, name of the image file, put image file in assets/images
           audio:""     string, name of the audio file, put audio file in assets/audio
        }
    */
    bank: [
        {
            name: "A Link to the Past",
            image: "aLttP.JPG",
            audio: "aLttP.mp3",
        },
        {
            name: "Breath of the Wild",
            image: "BotW.JPG",
            audio: "BotW.mp3",
        },
        {
            name: "Majoras Mask",
            image: "MM.JPG",
            audio: "MM.mp3",
        },
        {
            name: "Oracle of Ages",
            image: "OoA.JPG",
            audio: "OoA.mp3",
        },
        {
            name: "Oracle of Seasons",
            image: "OoS.JPG",
            audio: "OoS.mp3"
        },
        {
            name: "Ocarina of Time",
            image: "OoT.JPG",
            audio: "OoT.mp3",
        },
        {
            name: "Skyward Sword",
            image: "SS.JPG",
            audio: "SS.mp3",
        },
        {
            name: "Twilight Princess",
            image: "TP.JPG",
            audio: "TP.mp3"
        },
        {
            name: "Wind Waker",
            image: "WW.JPG",
            audio: "WW.mp3"
        },

    ],
    //---------

    //-------- Some global variables
    life: 6,        //variable life when =0 trigger game loss, also controls heart display
    answer: "",     //The correct answer chosen from bank
    answerArr: [],   //Store the answer into an array of lowercase letters
    word: [],       //arbitrary array to store "_" the user correct guesses
    wordRNG: -1,     //set initially equal to prevSeed and -1 to randomly choose from all
    prevSeed: -1,    //used for repetition prevention
    worddisp: "",   //string to be displayed on html
    wins: 0,
    losses: 0,
    guessed: [],   //keeping track of wrong guesses
    initiated: false, //For pressing any key to continue
    lowlife: false,   //state to prevent repeating lowlife audio

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
        game.answerStore();
        game.letterHide();
        game.heartFill();
        document.getElementById("heart1").style.animationDuration = "4s";
        document.getElementById("guessedtxt").innerHTML = game.guessed.join(" ");
        document.getElementById("wordtxt").innerHTML = game.worddisp;
        document.getElementById("continue").style.visibility = "hidden";
        document.getElementById("gameContent").style.visibility = "visible";
        document.getElementById("bgm").loop = true;
        document.getElementById("bgm").volume = 0.5;
        document.getElementById("bgm").play();
        game.initiated = true;
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


    answerStore: function () {
        for (var i = 0; i < game.answer.length; i++) {
            game.answerArr[i] = game.answer[i].toLowerCase();
        }
    },

    letterHide: function () {
        //game.answer is the choosed word by reset function 
        //converts letters of answer to an array of "_" with length equal to word length, and joins to string worddisp for displaying in html 
        //fine withe capital letters and space will replace special character with spaces
        for (var i = 0; i < game.answer.length; i++) {
            if (/^[a-z]+$/.test(game.answerArr[i])) {
                //   if(game.answerArr[i] === "a"){
                game.word.push(" _ ");
                game.worddisp = game.word.join("");
            } else {
                game.word.push("\xa0\xa0\xa0")
                game.worddisp = game.word.join("");
            }
        }
    },

    letterCheck: function (input) {
        //function that checks user input to the answer letter by letter and replaces the "_" in word array to the guess if it is correct. ok with duplicated letters
        var correct = false
        for (i = 0; i < game.answer.length; i++) {
            if (input === game.answerArr[i]) {
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

    win: function () {
        game.wins++;
        game.initiated = false;
        document.getElementById("continue").innerHTML = "Congratulations! <br> Press any key to continue";
        document.getElementById("continue").style.visibility = "visible";
        wintxtid = document.getElementById("wintxt");
        wintxtid.textContent = game.wins;
        document.getElementById("banner").src = "assets/images/" + game.bank[game.wordRNG].image;
        document.getElementById("bgm").src = "assets/audio/" + game.bank[game.wordRNG].audio;
        document.getElementById("sfx").src = "assets/audio/win.mp3";
        document.getElementById("sfx").loop = false;
        game.lowlife = false;
    },

    gameOver: function () {
        game.losses++;
        game.initiated = false;
        document.getElementById("continue").innerHTML = "Game Over <br> The Answer was: " + game.answer + "<br>Press any key to continue";
        document.getElementById("continue").style.visibility = "visible";
        losstxtid = document.getElementById("losstxt");
        losstxtid.textContent = game.losses;
        document.getElementById("banner").src = "assets/images/tLoZ.JPG";
        document.getElementById("bgm").pause();
        document.getElementById("bgm").src = "assets/audio/tLoZ.mp3";
        document.getElementById("sfx").src = "assets/audio/gameOver.mp3";
        document.getElementById("sfx").loop = false;
        game.lowlife = false;

    },

    heartDrop: function(){
        document.getElementById("heart" + game.life).style.backgroundColor = "gray";
        document.getElementById("heart" + game.life).style.animationDuration = "0s";
        game.life--;
    },

    heartFill: function () {
        for (var i = 1; i < 7; i++) {
            document.getElementById("heart" + i).style.backgroundColor = "red";
            document.getElementById("heart" + i).style.animationDuration = "4s";
        }
    },


    main: function (userinput) {
        //Press any key to start
        if (game.initiated === false) {
            game.reset();
        }
        //The Game
        else {
            if (/^[a-z]+$/.test(userinput) || /^[A-Z]+$/.test(userinput)) {
                userinput = userinput.toLowerCase();
                if (game.checkRepeat(userinput)) {
                    document.getElementById("error").play();
                } else {
                    if (game.letterCheck(userinput)) {
                    } else {
                        game.guessed.push(userinput);
                        game.heartDrop();
                        if (game.life === 1) {
                            document.getElementById("heart1").style.animationDuration = "1s";
                            if (game.lowlife === false) {
                                document.getElementById("sfx").src = "assets/audio/lowLife.mp3";
                                document.getElementById("sfx").loop = true;
                                game.lowlife = true;
                                document.getElementById("bgm").volume = 0.2;
                            }
                        }
                    }
                    //word + guessed update
                    document.getElementById("guessedtxt").innerHTML = game.guessed.join(" ");
                    document.getElementById("wordtxt").innerHTML = game.worddisp;
                    //condition checks
                    if (game.winCheck()) {
                        game.win();
                    };

                    if (game.life === 0) {
                        game.gameOver();
                    }
                }
            }
        }
    }
}

document.onkeyup = function (event) {
    game.main(event.key);
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


