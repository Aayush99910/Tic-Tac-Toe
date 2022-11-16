// "X", "O"


// TO BE TESTED
// [1, 3, 4, 7, 8]
// [1, 2, 3, 5, 8]
// [0, 1, 3, 6, 8]

const array = [
    "O", "O", "X",
    "O", "X", "X",
    "O", "X", "O"
];

// array[7] = "X";
// array[8] = "X";


function checkWinner() {
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
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "O") {
            Test.push(i);
        }
    }
    console.log(Test);

    let stillWinner;
    if (Test.includes(0) && Test.includes(3) && Test.includes(6)) {
        return stillWinner = true;
    }else if (Test.includes(2) && Test.includes(5) && Test.includes(8)) {
        return stillWinner = true;
    } else if (Test.includes(1) && Test.includes(4) && Test.includes(7)) {
        return stillWinner = true;
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
                console.log(tst);

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
                        return stillWinner;
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
        console.log(test);

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
                return stillWinner;
            }
        }
    }
    return stillWinner;
}
checkWinner()
console.log(checkWinner());
