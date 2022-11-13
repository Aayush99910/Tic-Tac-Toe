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
    const _showWinner = function (won) {
        if (won) {
            DisplayController.showWinner();
        } 
    }

    // checks winner by comparing arrays
    // it only works if the marks are 3 in a row else
    // it doesn't show the winner
    const Winner = function(mark) {
        const gameboard = GameBoard.gameboard;
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

    
        let Test = [];
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === mark) {
                Test.push(i);
            }
        }

        let stillWinner;
        if (Test.includes(2) && Test.includes(5) && Test.includes(8)) {
            _showWinner(true);
        } else if (Test.includes(1) && Test.includes(4) && Test.includes(7)) {
            _showWinner(true);
        }
        for (let i = 0; i <= Test.length; i++) {
            let test = [];
            let lastIndexOfTest = Test.length - 1;

            if (i === Test.length) {
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
                            _showWinner(stillWinner);
                        }
                    }
                }
            }else {
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
                    _showWinner(stillWinner);
                }
            }
        }
        _showWinner(stillWinner); // closure 
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
    const gameboard = GameBoard.gameboard;
    const Player = GameBoard.Player;


    // making two players manually
    const player1 = Player("Player 1", "X", true);
    const player2 = Player("Player 2", "O", false);

    // DOM elements
    const header = document.querySelector("header");
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
        
        // if its player1's turn, if there is no winner and if the board
        // is empty this if statement works.
        if (e.target.innerText === "" 
            && player1.turn === true
            && showplayerTurn.textContent !== "The game is finished!") {

            e.target.style.color = "red";
            e.target.textContent = player1.mark; // putting the player's mark in the box
            gameboard[Number(e.target.id)] = player1.mark; // adding the mark in the gameboard array
            

            CheckWinner.checkWinner(player1.mark); // checks for a winner


            player1.turn = false; // player1 turn is over
            player2.turn = true; // player2 turn now 
            

            if (showplayerTurn.textContent !== "The game is finished!") {
                showplayerTurn.textContent = `${player2.name} turn!`;
            }

        }

        // if its player2's turn, if there is no winner and if the board
        // is empty this if statement works.
        else if (e.target.innerText === "" 
                && player2.turn === true
                && showplayerTurn.textContent !== "The game is finished!") { 
            
                    e.target.style.color = "black";
                    e.target.textContent = player2.mark; // putting the player's mark in the box
                    gameboard[Number(e.target.id)] = player2.mark; // adding the mark in the gameboard array
            
        
                    CheckWinner.checkWinner(player2.mark); // checks for a winner


                    player2.turn = false; // player2 turn is over
                    player1.turn = true; // player1 turn now 


                    if (showplayerTurn.textContent !== "The game is finished!") {
                        showplayerTurn.textContent = `${player1.name} turn!`;
                    }

        }
    }

    const showWinner = function () {
        const header = document.querySelector("#player-turn");
        header.textContent = "The game is finished!"
    }

    // const restartGame = function () {
    //     gameboard = [];
    //     const boxs = document.querySelectorAll(".box");
    //     boxs.forEach((box) => {
    //         box.innerText = "";
    //     });
    // }

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
    // restartBtn.addEventListener("click", DisplayController.restart);
})();




