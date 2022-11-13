// Module of gameboard which makes a factory function
// for Player and returns an empty array
const GameBoard = (() => {
    let gameboard = []; //empty gameboard which will be populated by player mark
    
    // factory function 
    const Player = (name, mark, turn) => {
        return {
            name, 
            mark,
            turn
        };
    };
    
    // returning necessary variable/methods
    return {
        gameboard: gameboard,
        Player: Player
    };
})();



// CheckWinner module which gives access to winner function 
// it checks whether game is won or not
const CheckWinner = (function() {

    // shows winner in the document. This is a private function 
    // and only Winner has access to it
    const _showWinner = function (won, playername) {
        if (won) {
            DisplayController.showWinner(playername);
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

        // checking for winner if the pattern is [2, 5, 8]
        if (Test.includes(2) && Test.includes(5) && Test.includes(8)) {
            _showWinner(true, playername);
        } // checking for winner if the pattern is [1, 4, 7]
        else if (Test.includes(1) && Test.includes(4) && Test.includes(7)) {
            _showWinner(true, playername);
        }

        // looping through Test array
        for (let i = 0; i <= Test.length; i++) {
            let test = []; 
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
                    _showWinner(stillWinner, playername);
                    break;
                }
            }
        }
        _showWinner(stillWinner, playername); // closure 
    }

    // returning Winner method
    return {
        checkWinner: Winner
    }
})();


// This module displays everything that is needed on page by
// interacting with the DOM elements
const DisplayController = (function () {

    // getting the gameboard, factory function player from GameBoard
    let gameboard = GameBoard.gameboard;
    const Player = GameBoard.Player;


    // making two players manually
    const player1 = Player("Player 1", "X", true);
    const player2 = Player("Player 2", "O", false);

    // DOM elements
    const header = document.querySelector("header");
    const playerTurnText = document.querySelector("#player-turn");
    const showplayerTurn = document.querySelector("#player-turn");
    const gameContainer = document.querySelector("main");
    const footer = document.querySelector("footer");

    // function that hides the main and shows the grid
    const showGrid = function () {
        header.style.display = "none";
        gameContainer.style.display = "flex";
        footer.style.display = "flex";
    }

    // function that shows the main and hides the main
    const hideGrid = function () {
        header.style.display = "block";
        gameContainer.style.display = "none";
        footer.style.display = "none";
    }
    
    // renders mark when the player clicks on the board
    const renderMark = function (e) {
        if (e.target.innerText !== ""){
            return; // skips if the board is already populated
        }


        // if there is a winner already declared then it just skips
        if (showplayerTurn.textContent === "Player 1 Won!") {
            return 
        }else if (showplayerTurn.textContent === "Player 2 Won!") {
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
            if (showplayerTurn.textContent === "Player 1 Won!") {
                // pass
            }else if (showplayerTurn.textContent === "Player 2 Won!") {
                // pass
            }else{
                showplayerTurn.textContent = `${player2.name} turn!`;
            }

        }

        // if its player2's turn, if there is no winner and if the board
        // is empty this if statement works.
        else if (e.target.innerText === "" && player2.turn === true) { 
            e.target.style.color = "black";
            e.target.textContent = player2.mark; // putting the player's mark in the box
            gameboard[Number(e.target.id)] = player2.mark; // adding the mark in the gameboard array
            
            // checking for winner this function takes player's mark, gameboard and player's name
            CheckWinner.checkWinner(player2.mark, gameboard, player2.name);


            player2.turn = false; // player2 turn is over
            player1.turn = true; // player1 turn now 


            if (showplayerTurn.textContent === "Player 1 Won!") {
                // pass
            }else if (showplayerTurn.textContent === "Player 2 Won!") {
                // pass
            }else{
                showplayerTurn.textContent = `${player1.name} turn!`;
            }
        }
    }

    const showWinner = function (playername) {
        // shows the winner
        playerTurnText.textContent = `${playername} Won!`
    }

    const restartGame = function () {
        gameboard = [];
        const boxs = document.querySelectorAll(".box");
        boxs.forEach((box) => {
            box.innerText = "";
        });
        
        if (playerTurnText.textContent === "Player 1 Won!") {
            playerTurnText.textContent = "Player 2 turn!";
        }else if (playerTurnText.textContent === "Player 2 Won!") {
            playerTurnText.textContent = "Player 1 turn!";
        }
    }

    // returning showgrid function and renderMark function 
    return {
        render: renderMark,
        renderGrid: showGrid,
        hideGrid: hideGrid,
        showWinner: showWinner,
        restart: restartGame
    }
})();



// actual GameFlow which runs the game
const GameFlow = (function () {

    //DOM elements
    const startBtn = document.querySelector("#start-btn");
    const boxs = document.querySelectorAll(".box");
    const gobackBtn = document.querySelector("#goback-btn");
    const restartBtn = document.querySelector("#restart-btn");

    // event listener for each box which fires the renderMark function
    // from DisplayController Module
    boxs.forEach((box) => {box.addEventListener("click", DisplayController.render)});


    // event listener for start Btn
    startBtn.addEventListener("click", DisplayController.renderGrid);

    // event listener for goback Btn
    gobackBtn.addEventListener("click", DisplayController.hideGrid);

    // event listener for restart Btn
    restartBtn.addEventListener("click", DisplayController.restart);
})();




