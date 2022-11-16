let winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7 ,8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
let test = [1];

function checkWinner() {
    let stillWinner;
    for (let i = 0; i < winner.length; i++) {
        for (let j = 0; j < winner[i].length; j++) {
            if (winner[i][j] === test[j]) {
                stillWinner = true;
            }else { 
                stillWinner = false;
                break;
            }
        }
        if (stillWinner) {
            return stillWinner;
        }
    }
    return stillWinner;
}

console.log(checkWinner());