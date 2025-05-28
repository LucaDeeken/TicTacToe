# Tic Tac Toe

A browser-based Tic Tac Toe game built as part of The Odin Project JavaScript course in October 2024.

## Features
- Game board stored as an array inside a `Gameboard` object
- Players represented as objects
- Game flow logic encapsulated in its own controller object
- Minimal global code using factory functions and module pattern (IIFE)
- Checks for wins, ties, and game over conditions
- Players can place marks by clicking on the board
- Player name inputs and a restart button
- Displays the result after the game ends

## Technical Notes
- Clear separation between game logic and UI
- Game logic initially runs in the console before adding UI
- Uses factory and module patterns for clean, maintainable code
- Prevents players from marking already occupied spots

Live Demo: https://lucadeeken.github.io/TicTacToe/
