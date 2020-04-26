/** Connect Four */

class Game {
  constructor(height, width, p1, p2) {
    this.height = height;
    this.width = width;
    this.currPlayer = p1;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
    this.isGameOver = false;
    this.players = [p1, p2]
  }
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }
  makeHtmlBoard() {
    const board = document.getElementById("board");

    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick.bind(this));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  handleClick(evt) {
    if (!this.isGameOver) {
      const x = +evt.target.id;

      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer.color} won!`);
      }
      if (this.board.every((row) => row.every((cell) => cell))) {
        return this.endGame("Tie!");
      }
      this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  }
  checkForWin() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (
          this._win(horiz) ||
          this._win(vert) ||
          this._win(diagDR) ||
          this._win(diagDL)
        ) {
          return true;
        }
      }
    }
  }
  _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }
  endGame(msg) {
    alert(msg);
    this.isGameOver = true;
  }
}

class Player{
  constructor(color){
    this.color = color;
  }
}

document.querySelector('form').addEventListener('submit', function(evt){
  evt.preventDefault();
  document.querySelector('#board').innerHTML = '';
  const p1 = new Player(document.querySelector('#player1').value);
  const p2 = new Player(document.querySelector('#player2').value);
  new Game(6, 7, p1, p2);
  document.querySelector('#player1').value = '';
  document.querySelector('#player2').value = '';
 })

