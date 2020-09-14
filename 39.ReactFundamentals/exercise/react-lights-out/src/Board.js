import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 4, ncols = 4, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    initialBoard = Array.from({ length: nrows }, () => {
      let row = [];
      for (let i = 0; i < ncols; i++) {
        row.push(Math.random() > 0.5 ? true : false);
      }
      return row;
    });
    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => {
      return row.every((cell) => cell === true);
    });
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //   // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

      //   // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      //   // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <h1>You Won</h1>;
  }

  // make table board
  let gameTable = [];
  board.map((row, rIdx) => {
    return gameTable.push(
      <tbody>
        <tr>
          {row.map((col, cIdx) => {
            let coord = `${rIdx}-${cIdx}`;
            return (
              <Cell
                key={coord}
                isLit={board[rIdx][cIdx]}
                flipCellsAroundMe={() => flipCellsAround(coord)}
              />
            );
          })}
        </tr>
      </tbody>
    );
  });

  // TODO

  return (
    <div className="Board">
      <h1>Lights Out</h1>
      <p>Rules of game</p>
      <table className="Board Board-table">{gameTable}</table>
    </div>
  );
}

export default Board;
