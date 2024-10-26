const tictactoe = document.getElementsByClassName("tictactoe");
const startGame = document.getElementById("go");
const Form = document.getElementById("myForm");
const leftLayout = document.getElementById("myForm");
const table = document.getElementById("table");
const caption = document.getElementsByTagName("caption");
const winnerName= document.getElementById("captP1");
const tablePlayer1Name = document.getElementById("player1Name");
const tablePlayer2Name = document.getElementById("player2Name");
const PointsP1 = document.getElementById("pointsP1");
const PointsP2 = document.getElementById("pointsP2");
const resetBtn = document.getElementById("resetbutton")

Form.addEventListener("submit", (event) => playerObjVariable.handleSubmit(event));

function playerObj () {

  let P1 = "";
  let P2 = "";
  
  function playerName (name) {
    this.name = name;
  }

  let player = function(){
  
    let playerScore = 0;
    return function(){
  
        if (playerScore==="X") {
            playerScore="O";
        } else {
            playerScore="X";
        }
    return playerScore;
    }
  }();

  function handleSubmit(event) {
    event.preventDefault();
    const namePlayer1Value = document.getElementById("nameP1").value;
    const namePlayer2Value = document.getElementById("nameP2").value;
    P1 = new playerName (namePlayer1Value);
    P2 = new playerName (namePlayer2Value);
  }
  
  function getPlayers() {
    return { P1, P2 };
  }
return {player, handleSubmit, playerName, getPlayers};
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

  resetBtn.addEventListener("click", () => {
    reset();
    printBoard();
  })

  function Cell() {
    let value = undefined;
    const addToken = (player) => {
      value = player;
      return value
    };
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

  const score = function() {
    let scorePlayerA= 0;
    let scorePlayerB= 0;

    return function () {
      if(captP1.style.color==="red") {
        scorePlayerA+=1;
        PointsP1.textContent=scorePlayerA;
      } else {
        scorePlayerB+=1;
        PointsP2.textContent=scorePlayerB;
      }
        return { scorePlayerA, scorePlayerB }
      }
  }();

  function winConditions(){
    const players = playerObjVariable.getPlayers();
    if (
      (((board[0][0].getValue())+(board[0][1].getValue())+(board[0][2].getValue()))==="XXX") || (((board[1][0].getValue())+(board[1][1].getValue())+(board[1][2].getValue()))==="XXX") || (((board[2][0].getValue())+(board[2][1].getValue())+(board[2][2].getValue()))==="XXX") ||
      (((board[0][0].getValue())+(board[1][0].getValue())+(board[2][0].getValue()))==="XXX") || (((board[0][1].getValue())+(board[1][1].getValue())+(board[2][1].getValue()))==="XXX") || (((board[0][2].getValue())+(board[1][2].getValue())+(board[2][2].getValue()))==="XXX") ||
      (((board[0][0].getValue())+(board[1][1].getValue())+(board[2][2].getValue()))==="XXX") ||  (((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()))==="XXX")
        ) { 
        resetBtn.classList.remove("hiddenWon");
        for (let i=0; i<caption.length;i++)
          caption[i].classList.remove("hiddenWon");
        captP1.textContent=players.P1.name;
        captP1.style.color="red";
        score();
        reset();
    } else if (
      (((board[0][0].getValue())+(board[0][1].getValue())+(board[0][2].getValue()))==="OOO") || (((board[1][0].getValue())+(board[1][1].getValue())+(board[1][2].getValue()))==="OOO") || (((board[2][0].getValue())+(board[2][1].getValue())+(board[2][2].getValue()))==="OOO") ||
      (((board[0][0].getValue())+(board[1][0].getValue())+(board[2][0].getValue()))==="OOO") || (((board[0][1].getValue())+(board[1][1].getValue())+(board[2][1].getValue()))==="OOO") || (((board[0][2].getValue())+(board[1][2].getValue())+(board[2][2].getValue()))==="OOO") ||
      (((board[0][0].getValue())+(board[1][1].getValue())+(board[2][2].getValue()))==="OOO") ||  (((board[0][2].getValue())+(board[1][1].getValue())+(board[2][0].getValue()))==="OOO")
        ) {
        resetBtn.classList.remove("hiddenWon");
        for (let i=0; i<caption.length;i++)
          caption[i].classList.remove("hiddenWon");
        captP1.textContent=players.P2.name;
        captP1.style.color="blue";
        score();
        reset();
        };
  }

  startGame.addEventListener("click", () => {
    playerObjVariable.handleSubmit(event);
    leftLayout.classList.add("hidden");
    table.classList.remove("hidden");
    const players = playerObjVariable.getPlayers();
    console.log(players);
    tablePlayer1Name.textContent=players.P1.name;
    tablePlayer2Name.textContent=players.P2.name;
    for(let i=0; i<tictactoe.length;i++) {
      tictactoe[i].classList.remove("hidden");
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
  })
  return {printBoard, getBoard, winConditions, reset, init, score}
};

function gameFlow () {

  const resetGame = () => {
    roundsLeftToPlay = 9;
  };

  const endGame = function() {

    roundsLeftToPlay-=1;
    console.log(roundsLeftToPlay);
    if (roundsLeftToPlay===0) {
      alert("Spiel vorbei!");
      resetBtn.classList.remove("hiddenWon");
    };
    return roundsLeftToPlay;
  };
  return {endGame, resetGame};
}

const gameFlowVariable = gameFlow();
const gameBoardInstance = Gameboard();
const playerObjVariable = playerObj();
