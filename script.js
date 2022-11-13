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
        console.log(`"${mark}"`);
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

        
        let test = [];
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === mark && test.length < 3) {
                test.push(i);
            }
        }

        let stillWinner;
        for (let i = 0; i < winPattern.length; i++) {
            for (let j = 0; j < winPattern[i].length; j++) {
                if (winPattern[i][j] === test[j]) {
                    stillWinner = true;
                }else { 
                    stillWinner = false;
                    break;
                }
            }
            if (stillWinner) {
                _showWinner(stillWinner); // closure
                break;
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
    const player1 = Player("Sinju", "X", true);
    const player2 = Player("Aayush", "O", false);

    // DOM elements
    const header = document.querySelector("header");
    const showplayerTurn = document.querySelector("#player-turn");
    const gameContainer = document.querySelector("main");
    const footer = document.querySelector("footer");

    // function that shows grid
    const showGrid = function () {
        header.style.display = "none";
        gameContainer.style.display = "flex";
        footer.style.display = "contents";
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

    // returning showgrid function and renderMark function 
    return {
        render: renderMark,
        renderGrid: showGrid,
        showWinner: showWinner
    }
})();



// actual GameFlow which runs the game
const GameFlow = (function () {

    //DOM elements
    const startBtn = document.querySelector("#start-btn");
    const boxs = document.querySelectorAll(".box");

    // event listener for each box which fires the renderMark function
    // from DisplayController Module
    boxs.forEach((box) => {box.addEventListener("click", DisplayController.render)});


    // event listener for start Btn
    startBtn.addEventListener("click", DisplayController.renderGrid);
})();




