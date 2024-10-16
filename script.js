

let player = function(){

    let playerScore = 0;

    return function(){

        if (playerScore===1) {
            playerScore=2;
        }else{
            playerScore=1;
        }
    return playerScore;
    }
}();

function Gameboard() {

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
      };



    const markField = (rowIndex, columnIndex) => {
        const a = board[rowIndex][columnIndex].getValue();
        console.log(a);

        if ((board[rowIndex][columnIndex].getValue())===0) {
            board[rowIndex][columnIndex].addToken((player()));
            printBoard();
            endGame();
            dazu();
        } else {
            alert("Spot already taken!");
        }
        
      }

    const endGame = function() {

        let roundsLeftToPlay = 9;

        return function () {

            roundsLeftToPlay-=1;
            console.log(roundsLeftToPlay);
            if (roundsLeftToPlay===0) {
                alert("Spiel vorbei!")
            };
            return roundsLeftToPlay;
        }

    }();


    function dazu(){
        const rowSum = board[1].reduce((acc, cell) => acc + cell.getValue(), 0);
        console.log(rowSum);
    return rowSum
    }



    return {printBoard, getBoard, markField, dazu}
}

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
      return value
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }

Gameboard();


const game = {

};



const gameBoardInstance = Gameboard();
const boardState = gameBoardInstance.getBoard(); // Zugriff auf getBoard von außen
const markField = gameBoardInstance.markField;
const printBoard = gameBoardInstance.printBoard;
const winning = gameBoardInstance.dazu();
console.log(boardState);
