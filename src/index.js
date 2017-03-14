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




const getControlPoints = R.pipe(
	transpose,
	R.map(computeControlPoints),
	R.map(controlPointsToLists),
	transpose
);
