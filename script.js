// Module of gameboard which makes player and returns an empty array
// player1 and player 2
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

    // making two players manually
    const player1 = Player("Sinju", "X", true);
    const player2 = Player("Aayush", "O", false);
    

    // returning necessary variable/methods
    return {
        gameboard: gameboard,
        player1: player1,
        player2: player2
    };
})();


// CheckWinner module which gives access to winner function 
// it checks whether game is won or not
const CheckWinner = (function() {

    const header = document.querySelector("#player-turn");

    // shows winner in the document. This is a private function 
    // and only Winner has access to it
    const _showWinner = function (won) {
        if (won) {
            header.textContent = "The game is finished!"
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



// actual GameFlow which runs the game
const GameFlow = (function () {
    // getting the gameboard, player1 and player 2 from GameBoard
    const gameboard = GameBoard.gameboard;
    const player1 = GameBoard.player1;
    const player2 = GameBoard.player2;

    //DOM elements
    const boxs = document.querySelectorAll(".box");
    const showplayerTurn = document.querySelector("#player-turn");


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

    // event listener for each box whixh fired the renderMark function
    boxs.forEach((box) => {box.addEventListener("click", renderMark)});
})();

