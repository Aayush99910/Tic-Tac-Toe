const GameBoard = (() => {
    let gameboard = [];

    const Player = (name, mark, turn) => {
        return {
            name, 
            mark,
            turn
        };
    };

    const player1 = Player("Sinju", "X", true);
    const player2 = Player("Aayush", "O", false);
    
    return {
        gameboard: gameboard,
        player1: player1,
        player2: player2
    };
})();

const CheckWinner = (function() {

    const header = document.querySelector("#player-turn");

    const showWinner = function (won) {
        if (won) {
            header.textContent = "The game is finished!"
        } 
    }

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
                showWinner(stillWinner);
                break;
            }
        }
        showWinner(stillWinner);
    }

    return {
        checkWinner: Winner
    }
})();


const GameFlow = (function () {
    const gameboard = GameBoard.gameboard;
    const player1 = GameBoard.player1;
    const player2 = GameBoard.player2;

    //DOM elements
    const boxs = document.querySelectorAll(".box");
    const showplayerTurn = document.querySelector("#player-turn");

    const renderMark = function (e) {
        if (e.target.innerText !== ""){
            return;
        }
        

        if (e.target.innerText === "" 
            && player1.turn === true
            && showplayerTurn.textContent !== "The game is finished!") {
            e.target.textContent = player1.mark;
            gameboard[Number(e.target.id)] = player1.mark;
            
            CheckWinner.checkWinner(player1.mark);





            player1.turn = false;
            player2.turn = true;
            if (showplayerTurn.textContent !== "The game is finished!") {
                showplayerTurn.textContent = `${player2.name} turn!`;
            }

        }else if (e.target.innerText === "" 
                  && player2.turn === true
                  && showplayerTurn.textContent !== "The game is finished!") { 
            e.target.textContent = player2.mark;
            gameboard[Number(e.target.id)] = player2.mark;
            
            
            
            
            
            
            
            
            
            
            CheckWinner.checkWinner(player2.mark);
            player2.turn = false;
            player1.turn = true;

            if (showplayerTurn.textContent !== "The game is finished!") {
                showplayerTurn.textContent = `${player1.name} turn!`;
            }

        }
        console.log(gameboard);
    }

    boxs.forEach((box) => {box.addEventListener("click", renderMark)});

    const showMark = function () {
        let game = GameBoard.gameboard;
        boxs.forEach((box) => {
            let i = box.id
            box.textContent = game[i];
        });
    }

    return {
        showMark
    }
})();

