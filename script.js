function playerObj () {

  let player = function(){

    let playerScore = 0;
  
    return function(){
  
        if (playerScore===1) {
            playerScore=4;
        }else{
            playerScore=1;
        }
    return playerScore;
    }
  }();

return {player};
}






function Gameboard () {

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<columns; j++) {
            board[i].push(Cell());
        }
    }


    function Cell() {
      let value = undefined;
    
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


    const getBoard = () => board;
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
      };

    const markField = (rowIndex, columnIndex) => {
        const a = board[rowIndex][columnIndex].getValue();
        console.log(a);

        if ((board[rowIndex][columnIndex].getValue())===undefined) {
            board[rowIndex][columnIndex].addToken((playerObjVariable.player()));
            printBoard();
            gameFlowVariable.endGame();
            winConditions();
        } else {
            alert("Spot already taken!");
        }
      }

    function winConditions(){
        const rowSum = board[1].reduce((acc, cell) => acc + cell.getValue(), 0);
        console.log(rowSum);
        console.log((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()));
        if (
            (((board[0].reduce((acc, cell) => acc + cell.getValue(), 0)))===3) || (((board[1].reduce((acc, cell) => acc + cell.getValue(), 0)))===3) || (((board[2].reduce((acc, cell) => acc + cell.getValue(), 0)))===3) ||
            (((board[0][0].getValue())+(board[1][0].getValue())+(board[2][0].getValue()))===3) || (((board[0][1].getValue())+(board[1][1].getValue())+(board[2][1].getValue()))===3) || (((board[0][2].getValue())+(board[1][2].getValue())+(board[2][2].getValue()))===3) ||
            (((board[0][0].getValue())+(board[1][1].getValue())+(board[2][2].getValue()))===3) ||  (((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()))===3)
          ) { 
            let a= alert("hi");
          } else if (
            (((board[0].reduce((acc, cell) => acc + cell.getValue(), 0)))===12) || (((board[1].reduce((acc, cell) => acc + cell.getValue(), 0)))===12) || (((board[2].reduce((acc, cell) => acc + cell.getValue(), 0)))===12) ||
            (((board[0][0].getValue())+(board[1][0].getValue())+(board[2][0].getValue()))===12) || (((board[0][1].getValue())+(board[1][1].getValue())+(board[2][1].getValue()))===12) || (((board[0][2].getValue())+(board[1][2].getValue())+(board[2][2].getValue()))===12) ||
            (((board[0][0].getValue())+(board[1][1].getValue())+(board[2][2].getValue()))===12) ||  (((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()))===12)
          ) {
            let b= alert("WON12");
          };
    return rowSum
    }
    return {printBoard, getBoard, markField, winConditions}
};





const gameFlowVariable = gameFlow();
const gameBoardInstance = Gameboard();
const playerObjVariable = playerObj();
const boardState = gameBoardInstance.getBoard(); // Zugriff auf getBoard von außen
const markField = gameBoardInstance.markField;
const printBoard = gameBoardInstance.printBoard;
console.log(boardState);



function gameFlow () {

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

  return {endGame}

}
