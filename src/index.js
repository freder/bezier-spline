const R = require('ramda');
const computeControlPoints = require('./computeControlPoints.js');


const transpose = 
module.exports.transpose = 
function transpose(lists) {
	const len = Math.min(
		...(lists.map(R.prop('length')))
	);
	return R.range(0, len)
		.reduce(
			(acc, i) => [
				...acc, 
				lists.map(R.nth(i))
			], 
			[]
		);
};
