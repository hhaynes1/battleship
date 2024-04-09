import Ship from './ship.js';
const testShip = new Ship(1);

test('can query ship length', () => {
    expect(testShip.length).toBe(1);
})

testShip.hit();
test('ship can be hit', () => {
    expect(testShip.hits).toBe(1);
})

test('ship can be sunk', () => {
    expect(testShip.isSunk()).toBe(true);
})