import Ship from "./ship.js";

export default class Gameboard {
    constructor() {
        // list of coordinates
        this.board = this.fillBoard();
        // list of ships
        this.fleet = {};
    }

    fillBoard() {
        let newBoard = []
        for (let i = 0; i < 10; i++) {
            newBoard[i] = [];
            for (let j = 0; j < 10; j++) {
                newBoard[i][j] = 0;
            }
        }
        return newBoard;
    }

    addShip(start, stop) {
        let diffX = Math.abs(start[0] - stop[0]);
        let diffY = Math.abs(start[1] - stop[1]);

        // return if diagonal
        if (!(diffX === 0 || diffY === 0)) {
            console.log('must be vertical/horizontal');
            return false;
        }

        // add Ship object to Gameboard
        let shipNum = Object.keys(this.fleet).length + 1;
        this.fleet[`${shipNum}`] = new Ship(Math.max(diffX, diffY));

        // draw ship on map between two points
        this.board[start[1]][start[0]] = shipNum;
        let i = 0;
        while (diffX--) {
            // horizontal
            i++;
            start[0] > stop[0]
                ? this.board[start[1]][start[0] - i] = shipNum
                : this.board[start[1]][start[0] + i] = shipNum;
        }
        while (diffY--) {
            // vertical
            i++;
            start[1] > stop[1]
                ? this.board[start[1] - i][start[0]] = shipNum
                : this.board[start[1] + i][start[0]] = shipNum;
        }
        return true;
    }

    receiveAttack([x, y]) {
        let cell = this.board[y][x];
        if (cell === 0) {
            // missed
            this.board[y][x] = '#';
        } else if (typeof cell === 'number') {
            // hit
            this.fleet[`${cell}`].hits++;

            // check if sunk
            let ship = this.fleet[`${cell}`];
            if (ship.hits >= ship.length) {
                this.fleet[`${cell}`].sunk = true;
            }
            this.board[y][x] = 'x';
        }
    }

    display() {
        console.log('');
        for (let i = this.board.length; i >= 0; i--) {
            console.log(this.board[i]);
        }
    }
}