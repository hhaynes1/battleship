import Gameboard from "./gameboard.js";
const testBoard = new Gameboard();

test('create empty board', () => {
    expect(JSON.stringify(testBoard.board)).toBe(
        '[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]');
})

test('can add ships', () => {
    expect(testBoard.addShip([1, 1], [1, 2])).toBe(true);
})

test('ships have length', () => {
    expect(Object.keys(testBoard.fleet).length).toBe(1);
})

test('ship is vertical/horizontal', () => {
    expect(testBoard.addShip([1, 2], [3, 0])).toBe(false);
})

test('ship displays on board', () => {
    expect(testBoard.board[1][1]).toBe(1);
    expect(testBoard.board[2][1]).toBe(1);
})

test('ship can be hit', () => {
    testBoard.receiveAttack([1, 2]);
    expect(testBoard.board[2][1]).toBe('x');
    expect(testBoard.fleet[1].hits).toBe(1);
})

test('ship can be sunk', () => {
    testBoard.receiveAttack([1, 1]);
    expect(testBoard.board[1][1]).toBe('x');
    expect(testBoard.fleet[1].hits).toBe(2);
    expect(testBoard.fleet[1].isSunk()).toBe(true);
})