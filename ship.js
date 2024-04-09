export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.sunk === false ? this.hits++ : null;
    }

    isSunk() {
        this.hits >= this.length ? this.sunk = true : null;
        return this.sunk;
    }
}