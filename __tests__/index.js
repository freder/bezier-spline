/* global test: true */
/* global expect: true */
const bezierSpline = require('../src/index.js');


test('transpose()', () => {
	const lists = [
		['x1', 'x2', 'x3'],
		['y1', 'y2', 'y3'],
		['z1', 'z2', 'z3']
	];
	const result = bezierSpline.transpose(lists);
	expect(result[0]).toEqual(['x1', 'y1', 'z1']);
	expect(result[1]).toEqual(['x2', 'y2', 'z2']);
	expect(result[2]).toEqual(['x3', 'y3', 'z3']);
});


test('alternate()', () => {
	const a = ['a1', 'a2', 'a3'];
	const b = ['b1', 'b2'];
	const result = bezierSpline.alternate(a, b);
	expect(result).toEqual(['a1', 'b1', 'a2', 'b2', 'a3']);
});
test('alternate()', () => {
	const a = ['a1', 'a2', 'a3'];
	const b = ['b1', 'b2', 'b3'];
	const result = bezierSpline.alternate(a, b);
	expect(result).toEqual(['a1', 'b1', 'a2', 'b2', 'a3', 'b3']);
});
test('alternate()', () => {
	const a = ['a1', 'a2', 'a3'];
	const b = ['b1', 'b2', 'b3', 'b4', 'b5'];
	const result = bezierSpline.alternate(a, b);
	expect(result).toEqual(['a1', 'b1', 'a2', 'b2', 'a3', 'b3', undefined, 'b4', undefined, 'b5']);
});
