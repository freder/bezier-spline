/* global test: true */
/* global expect: true */
const transpose = require('../src/transpose.js');


test('transpose()', () => {
	const lists = [
		['x1', 'x2', 'x3'],
		['y1', 'y2', 'y3'],
		['z1', 'z2', 'z3']
	];
	const result = transpose(lists);
	expect(result[0]).toEqual(['x1', 'y1', 'z1']);
	expect(result[1]).toEqual(['x2', 'y2', 'z2']);
	expect(result[2]).toEqual(['x3', 'y3', 'z3']);
});
