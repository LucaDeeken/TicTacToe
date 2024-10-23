const tictactoe = document.getElementsByClassName("tictactoe");

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
  let board = [];

  function init(){
    for (let i = 0; i<rows; i++) {
    board[i] = [];
      for (let j=0; j<columns; j++) {
      board[i].push(Cell());
      }
    }
    gameFlowVariable.resetGame();
    };
  
  init();

  const reset = () => {
    board = [];
    init();
    gameFlowVariable.resetGame();
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
    let test = [];
      for (let i=0; i<boardWithCellValues.length; i++) {
        for(let j=0; j<boardWithCellValues[i].length;j++) {
          test.push((boardWithCellValues[i][j]));
        }
      }
    for(let i=0; i<test.length; i++) {
      tictactoe[i].textContent = test[i];
    }
  };

  function winConditions(){
    const rowSum = board[1].reduce((acc, cell) => acc + cell.getValue(), 0);
    console.log(rowSum);
    console.log((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()));
    if (
      (((board[0].reduce((acc, cell) => acc + cell.getValue(), 0)))===3) || (((board[1].reduce((acc, cell) => acc + cell.getValue(), 0)))===3) || (((board[2].reduce((acc, cell) => acc + cell.getValue(), 0)))===3) ||
      (((board[0][0].getValue())+(board[1][0].getValue())+(board[2][0].getValue()))===3) || (((board[0][1].getValue())+(board[1][1].getValue())+(board[2][1].getValue()))===3) || (((board[0][2].getValue())+(board[1][2].getValue())+(board[2][2].getValue()))===3) ||
      (((board[0][0].getValue())+(board[1][1].getValue())+(board[2][2].getValue()))===3) ||  (((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()))===3)
        ) { 
        let a= alert("PlayerOne wins");
    } else if (
      (((board[0].reduce((acc, cell) => acc + cell.getValue(), 0)))===12) || (((board[1].reduce((acc, cell) => acc + cell.getValue(), 0)))===12) || (((board[2].reduce((acc, cell) => acc + cell.getValue(), 0)))===12) ||
      (((board[0][0].getValue())+(board[1][0].getValue())+(board[2][0].getValue()))===12) || (((board[0][1].getValue())+(board[1][1].getValue())+(board[2][1].getValue()))===12) || (((board[0][2].getValue())+(board[1][2].getValue())+(board[2][2].getValue()))===12) ||
      (((board[0][0].getValue())+(board[1][1].getValue())+(board[2][2].getValue()))===12) ||  (((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()))===12)
        ) {
        let b= alert("PlayerTwo wins");
        };
  }

  for(let i=0; i<tictactoe.length;i++) {
    tictactoe[i].addEventListener("click", (event) => {
      let clickedField = event.target;
      let rowIndex = clickedField.dataset.row;
      let columnIndex = clickedField.dataset.column;
      const markField = (rowIndex, columnIndex) => {
        if ((board[rowIndex][columnIndex].getValue())===undefined) {
          board[rowIndex][columnIndex].addToken((playerObjVariable.player()));
          printBoard();
          winConditions();
          gameFlowVariable.endGame();
        } else {
          alert("Spot already taken!");
          }
        }
        markField(rowIndex, columnIndex);
    });
  }
  return {printBoard, getBoard, winConditions, reset}
};

const gameFlowVariable = gameFlow();
const gameBoardInstance = Gameboard();
const playerObjVariable = playerObj();
const boardState = gameBoardInstance.getBoard(); // Zugriff auf getBoard von außen
const markField = gameBoardInstance.markField;
const printBoard = gameBoardInstance.printBoard;
console.log(boardState);

function gameFlow () {

  const resetGame = () => {
    roundsLeftToPlay = 9;
  };

  const endGame = function() {

    roundsLeftToPlay-=1;
    console.log(roundsLeftToPlay);
    if (roundsLeftToPlay===0) {
      alert("Spiel vorbei!")
    };
    return roundsLeftToPlay;
  };
  return {endGame, resetGame};
}