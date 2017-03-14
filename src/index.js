const R = require('ramda');
const computeControlPoints = require('./computeControlPoints.js');
const transpose = require('./transpose.js');


const controlPointsToLists = (controlPoints) => {
	return R.flatten(
		transpose([
			controlPoints.p1,
			controlPoints.p2,
		])
	);
};


