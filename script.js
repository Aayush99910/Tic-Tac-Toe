// Module of gameboard which makes a factory function
// for Player and returns an empty array
const GameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]; //empty gameboard which will be populated by player mark
    
    // factory function 
    const Player = (name, mark, ai, turn) => {
        return {
            name, 
            mark,
            ai,
            turn
        };
    };
    
    // returning necessary variable/methods
    return {
        gameboard: gameboard,
        Player: Player,
    };
})();


//
const Computer = (function () {
    let randomNumber;

    function _checkIfAvailable(gameboard) {
        if (gameboard[randomNumber] === "") {
            return randomNumber;
        }else {
            randomNumber = _generateRandomNumber();
            let emptyPlace = (_checkIfAvailable(gameboard));
            return emptyPlace;
        }
    }

    const _generateRandomNumber = function () {
        let randomNumber = Math.floor( Math.random() * 9);
        return randomNumber;
    }

    const computerMove = function (gameboard) {
        randomNumber = _generateRandomNumber();
        let number = _checkIfAvailable(gameboard)
        if(number) {
            return number; 
        };
    }

    const bestMove = function (gameboard) {
        let bestScore = -Infinity;
        let move;
        for(let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === "") {
                gameboard[i] = "O";
                let score = _minimax(gameboard, 0, false);
                gameboard[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    const _checkAbstractWinner = function(gameboard) {
        const mark = ["X", "O"];
        for (let j = 0; j < mark.length; j++) {
            let Test = [];
            let winner = false;
            
            for (let i = 0; i < gameboard.length; i++) {
                if (gameboard[i] === mark[j]) {
                    Test.push(i);
                }
            }

            // checking for winner if the pattern is [0, 3, 6]
            if (Test.includes(0) && Test.includes(1) && Test.includes(2)) {
                winner = true;
                return mark[j];
            } // checking for winner if the pattern is [2, 5, 8]
            else if (Test.includes(3) && Test.includes(4) && Test.includes(5)) {
                winner = true;
                return mark[j];
            } // checking for winner if the pattern is [1, 4, 7]
            else if (Test.includes(6) && Test.includes(7) && Test.includes(8)) {
                winner = true;
                return mark[j];
            } else if (Test.includes(0) && Test.includes(3) && Test.includes(6)) {
                winner = true;
                return mark[j];
            }
            else if (Test.includes(1) && Test.includes(4) && Test.includes(7)) {
                winner = true;
                return mark[j];
            }
            else if (Test.includes(2) && Test.includes(5) && Test.includes(8)) {
                winner = true;
                return mark[j];
            }
            else if (Test.includes(0) && Test.includes(4) && Test.includes(8)) {
                winner = true;
                return mark[j];
            }
            else if (Test.includes(2) && Test.includes(4) && Test.includes(6)) {
                winner = true;
                return mark[j];
            }
            else if (Test.length === 5 && winner === false) {
                return "draw";
            }
        }
        return null;
    }

    const scores = {
        O: 1,
        X: -1,
        draw: 0
    }

    function _minimax(gameboard, depth, isMaximizingPlayer)  {
        let winnerMark = _checkAbstractWinner(gameboard);
        if (winnerMark !== null) {
            return scores[winnerMark];
        }

        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            for(let i = 0; i < gameboard.length; i++) {
                if (gameboard[i] === "") {
                    gameboard[i] = "O";
                    let score = _minimax(gameboard, depth+1, false);
                    gameboard[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < gameboard.length; i++) {
                if (gameboard[i] === "") {
                    gameboard[i] = "X";
                    let score = _minimax(gameboard, depth+1, true);
                    gameboard[i] = "";
                    if (score < bestScore) {
                        bestScore = score;
                    }
                }
            }
            return bestScore;
        }
    }

    return {
        computerMove: computerMove,
        bestMove: bestMove
    }

})();



// CheckWinner module which gives access to winner function 
// it checks whether game is won or not
const CheckWinner = (function() {

    let winner = false; // no winner at the first
    
    // this function renders draw if there is no winner and also if all 
    // the array fills up
    const _draw = function (string) {
        if (string.toLowerCase() === "draw") {
            DisplayController.draw();
        }
    }

    // shows winner in the document. This is a private function 
    // and only Winner has access to it
    const _showWinner = function (won, playername) {
        if (won) {
            DisplayController.showWinner(playername);
            winner = true; // winner is assigned to true if winner is declared
        } 
    }

    // checks winner by comparing arrays
    // it only works if the marks are 3 in a row else
    // it doesn't show the winner
    const Winner = function(mark, gameboard, playername) {
        let winPattern = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7 ,8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ]

        winner = false; // winner is false everytime we check for the winner

    
        let Test = []; // array which stores all the given mark
        // looping through the gameboard array and pushing the 
        // mark which matches our mark
        for (let i = 0; i < gameboard.length; i++) { 
            if (gameboard[i] === mark) {
                Test.push(i);
            }
        }

        // winner which will be declared if the given person is winner
        let stillWinner;


        // checking for winner if the pattern is [0, 3, 6]
        if (Test.includes(0) && Test.includes(3) && Test.includes(6)) {
            _showWinner(true, playername);
        } // checking for winner if the pattern is [2, 5, 8]
        else if (Test.includes(2) && Test.includes(5) && Test.includes(8)) {
            _showWinner(true, playername);
        } // checking for winner if the pattern is [1, 4, 7]
        else if (Test.includes(1) && Test.includes(4) && Test.includes(7)) {
            _showWinner(true, playername);
        }

        // looping through Test array
        for (let i = 0; i <= Test.length; i++) {

            // if winner is already declared then we skip
            if (winner) {
                return;
            }

            let test = []; // test case 
            let lastIndexOfTest = Test.length - 1;

            // this will only fire when i is equal to the Test's length
            // if all the combination of array has been checked
            // this will check for all the even number
            if (i === Test.length) {
                // filters out odd number from the array
                let Tst = Test.filter((item) => {
                    if (item === 0) {
                        return true;
                    } else if (item !== 0 && item % 2 === 0){
                        return true;
                    } else if (item !== 0 && item % 2 !== 0) {
                        return false;
                    }
                });

                
                for (let l = 0; l < Tst.length; l++) {
                    let tst = [];
                    let lastIndexOfTst = Tst.length - 1;
                    tst[0] = Tst[l];

                    if ((l + 1) > lastIndexOfTst) {
                        tst[1] = Tst[0];
                        tst[2] = Tst[1];
                    } else if ((l + 2) > lastIndexOfTst) {
                        tst[1]  = Tst[l + 1];
                        tst[2]  = Tst[0];
                    } 
                    else {
                        tst[1]  = Tst[l + 1];
                        tst[2] = Tst[l + 2];
                    }
                    tst.sort();

                    for (let j = 0; j < winPattern.length; j++) {
                        for (let k = 0; k < winPattern[j].length; k++) {
                            if (winPattern[j][k] === tst[k]) {
                                stillWinner = true;
                            }else { 
                                stillWinner = false;
                                break;
                            }
                        }
                        if (stillWinner) {
                            _showWinner(stillWinner, playername);
                        }
                    }
                }
            }
            
            else {
                // here test array is part of Test
                // For example if Test = [0, 2, 4, 5, 7]
                // first test= [0, 2, 4]
                // second test = [2, 4, 5]
                // third test = [4, 5, 7]
                // and when i+2 > lastIndexOfText test = [5, 7, 0]
                // and when i+1 > lastIndexOfText test = [7, 0, 2]
                test[0] = Test[i];

                if ((i + 1) > lastIndexOfTest) {
                    test[1] = Test[0];
                    test[2] = Test[1];
                } else if ((i + 2) > lastIndexOfTest) {
                    test[1]  = Test[i + 1];
                    test[2]  = Test[0];
                } 
                else {
                    test[1]  = Test[i + 1];
                    test[2] = Test[i + 2];
                }
            }

            test.sort();

            // this function will check the given test against 
            // the winPattern if it was first test ([0, 2, 4])
            // it will check if [0, 2, 4] is a winPattern or not if it
            // is then it will call the _showWinner closure which will 
            // show the winner 
            for (let j = 0; j < winPattern.length; j++) {
                for (let k = 0; k < winPattern[j].length; k++) {
                    if (winPattern[j][k] === test[k]) {
                        stillWinner = true;
                    }else { 
                        stillWinner = false;
                        break;
                    }
                }
                if (stillWinner) {
                    _showWinner(stillWinner, playername); // closure 
                    break;
                }
            }
        } 
        if (stillWinner === false && Test.length === 5) {
            _draw("Draw");
        }
        _showWinner(stillWinner, playername); 
    }

    // returning Winner method
    return {
        checkWinner: Winner
    }
})();


// This module displays everything that is needed on page by
// interacting with the DOM elements
const DisplayController = (function () {

    // DOM elements
    const boxs = document.querySelectorAll(".box");
    const header = document.querySelector("header");
    const playerTurnText = document.querySelector("#player-turn");
    const showplayerTurn = document.querySelector("#player-turn");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const formContainer = document.querySelector(".form-container");
    const gameContainer = document.querySelector(".game-container");
    const form = document.querySelector("form");
    const modal = document.querySelector("#id01");


    // getting the gameboard, factory function player from GameBoard
    let gameboard = GameBoard.gameboard;
    const Player = GameBoard.Player;
    let player1;
    let player2;
    let winner = false;
    let Draw = false;

    // getting all the input from the form
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // preventing default 
        let player1name= document.querySelector("#player1name").value;
        let player2name = document.querySelector("#player2name").value;

        let computer = document.querySelector("#computer");
        if (computer.checked) {

            // making two players and if computer is checked
            // then other player is computer
            player1 = Player(player1name, "X", false, true);
            player2 = Player("Computer", "O", true, false);
        } else {

            // making two players and naming them by getting
            // input from the DOM
            player1 = Player(player1name, "X", false, true);
            player2 = Player(player2name, "O", false, false);
        }
        

    })

    // function that shows the grid
    const showForm = function () {
        header.style.display = "none";
        formContainer.style.display = "flex";
        main.style.display = "flex";
        main.style.alignItems = "center";
    }

    // function that hides the main and shows the grid
    const showGrid = function () {
        const player1name= document.querySelector("#player1name").value;
        const player2name = document.querySelector("#player2name").value;


        // if no input then we alert the user.
        if (player1name === "" || player2name === "") {
            alert("Please provide player name.")
            return; // skips if there is no input
        }

        showplayerTurn.textContent = `${player1name} turn!`
        header.style.display = "none";
        gameContainer.style.display = "flex";
        formContainer.style.display = "none";
        footer.style.display = "flex";
    }

    // function that shows the main and hides the main
    const hideGrid = function () {
        // when we goback to the main title everything is reset
        gameboard = ["", "", "", "", "", "", "", "", ""];
        winner = false;
        Draw = false;
        const boxs = document.querySelectorAll(".box");
        boxs.forEach((box) => {
            box.innerText = "";
        });

        header.style.display = "block";
        main.style.display = "none";
        gameContainer.style.display = "none";
        formContainer.style.display = "none";
        footer.style.display = "none";
    }
    
    // renders mark when the player clicks on the board
    const renderMark = function (e) {
        if (e.target.innerText !== ""){
            return; // skips if the board is already populated
        }


        // if there is a winner already declared then it just skips
        // or if there is a draw it skips
        if (winner || Draw) {
            return 
        }
        
        // if its player1's turn, if there is no winner and if the board
        // is empty this if statement works.
        if (e.target.innerText === "" && player1.turn === true) {

            e.target.style.color = "red"; // setting the marker's color to red
            e.target.textContent = player1.mark; // putting the player's mark in the box
            gameboard[Number(e.target.id)] = player1.mark; // adding the mark in the gameboard array
            
            // checking for winner this function takes player's mark, gameboard and player's name
            CheckWinner.checkWinner(player1.mark, gameboard, player1.name);


            player1.turn = false; // player1 turn is over
            player2.turn = true; // player2 turn now 
            


            // if winner already declared then nothing happens 
            // if not then displays other player's turn 
            if (winner || Draw) {
                // pass
            }else{
                showplayerTurn.textContent = `${player2.name} turn!`;
            }
            console.log(gameboard);
        }

        // if its player2's turn, if there is no winner and if the board
        // is empty this if statement works.
        else if (e.target.innerText === "" && player2.turn === true && player2.ai === false) {

            e.target.style.color = "black";
            e.target.textContent = player2.mark; // putting the player's mark in the box
            gameboard[Number(e.target.id)] = player2.mark; // adding the mark in the gameboard array
            
            // checking for winner this function takes player's mark, gameboard and player's name
            CheckWinner.checkWinner(player2.mark, gameboard, player2.name);


            player2.turn = false; // player2 turn is over
            player1.turn = true; // player1 turn now 


            if (winner || Draw){
                // pass
            }else{
                showplayerTurn.textContent = `${player1.name} turn!`;
            }
            console.log(gameboard);
        }

        if (winner || Draw){
            return 
        }   

        if (player2.turn === true && player2.ai === true) {
            let bestMove = Computer.bestMove(gameboard);
            boxs.forEach(function (box) {
                if (Number(box.id) === bestMove) {
                box.style.color = "black";
                box.textContent = player2.mark;
                gameboard[bestMove] = player2.mark; // adding the mark in the gameboard array
                }
            });
        
            // checking for winner this function takes player's mark, gameboard and player's name
            CheckWinner.checkWinner(player2.mark, gameboard, player2.name);
        
            player2.turn = false;
            player1.turn = true;
        
        
            if (winner || Draw){
                // pass
            }else{
                showplayerTurn.textContent = `${player1.name} turn!`;
            }
            console.log(gameboard);
                
        }

        // if ai is true this function runs
        // if (player2.turn === true && player2.ai === true) {
        //     let emptyPlace = Computer.computerMove(gameboard);
        //     boxs.forEach(function (box) {
        //         if (Number(box.id) === emptyPlace) {
        //             box.style.color = "black";
        //             box.textContent = player2.mark;
        //             gameboard[emptyPlace] = player2.mark; // adding the mark in the gameboard array
        //         }
        //     });

        //     // checking for winner this function takes player's mark, gameboard and player's name
        //     CheckWinner.checkWinner(player2.mark, gameboard, player2.name);

        //     player2.turn = false;
        //     player1.turn = true;


        //     if (winner || Draw){
        //         // pass
        //     }else{
        //         showplayerTurn.textContent = `${player1.name} turn!`;
        //     }
        //     console.log(gameboard);
        // }
    }

    const showWinner = function (playername) {
        winner = true;
        modal.style.display = "flex";

        const winnerPara = document.querySelector("#winner");
        winnerPara.textContent = `${playername} Won!`;

        // shows the winner
        playerTurnText.textContent = `${playername} Won!`
    }

    const hideModal = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
    }

    const draw = function () {
        Draw = true;
        // shows if draw
        playerTurnText.textContent = "Draw";
    }

    const restartGame = function () { 
        if (window.getComputedStyle(modal).display === "flex") {
            modal.style.display = "none";
        }

        gameboard = ["", "", "", "", "", "", "", "", ""];
        winner = false;
        Draw = false;

        if (player2.ai === true) {
            player1.turn = true;
            player2.turn = false;
        }

        const boxs = document.querySelectorAll(".box");
        boxs.forEach((box) => {
            box.innerText = "";
        });

        // if draw and player1's turn then we show player1 turn in the DOM
        if (playerTurnText.textContent === "Draw" && player1.turn) {
            playerTurnText.textContent = `${player1.name} turn!`;
        }
        // if draw and player2's turn then we show player2 turn in the DOM
        else if (playerTurnText.textContent === "Draw" && player2.turn) {
            playerTurnText.textContent = `${player2.name} turn!`;
        }
        
        // if player 1 won then player 2's turn is showed and vice versa
        if (playerTurnText.textContent === `${player1.name} Won!` && player2.ai === false) {
            playerTurnText.textContent = `${player2.name} turn!`;
        }else if (playerTurnText.textContent === `${player2.name} Won!` && player2.ai === false) {
            playerTurnText.textContent = `${player1.name} turn!`;
        }
    }

    // returning all the necessary function 
    return {
        render: renderMark,
        renderGrid: showGrid,
        hideGrid: hideGrid,
        showWinner: showWinner,
        restart: restartGame,
        renderForm: showForm,
        draw: draw,
        hideModal: hideModal
    }
})();



// actual GameFlow which runs the game
const GameFlow = (function () {

    //DOM elements
    const startBtn = document.querySelector("#start-btn");
    const boxs = document.querySelectorAll(".box");
    const playBtn = document.querySelector("#play-btn");
    const gobackBtn = document.querySelector("#goback-btn");
    const restartBtn = document.querySelector("#restart-btn");
    const nextRoundBtn = document.querySelector("#next-round-btn");

    // event listener for each box which fires the renderMark function
    // from DisplayController Module
    boxs.forEach((box) => {box.addEventListener("click", DisplayController.render)});

    // event listener for start Btn
    startBtn.addEventListener("click", DisplayController.renderForm);

    // event listener for play Btn
    playBtn.addEventListener("click", DisplayController.renderGrid);

    // event listener for goback Btn
    gobackBtn.addEventListener("click", DisplayController.hideGrid);

    // event listener for restart Btn
    restartBtn.addEventListener("click", DisplayController.restart);

    // event listener for next round Btn
    nextRoundBtn.addEventListener("click", DisplayController.restart);

    // hides modal if user clicks outside the box
    window.onclick = DisplayController.hideModal;
})();




