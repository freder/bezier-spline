# @freder/bezier-spline

automatically generates control points for a list of on-curve bezier points. – core code is based on [https://www.particleincell.com/2012/bezier-splines/](http://www.particleincell.com/2012/bezier-splines/ )

```javascript
const bezierSpline = require('@freder/bezier-spline');

// list of on-curve points
const points = [
	[0, 0, 0], // x, y, z
	[1, 1, 0],
	[2, 0, 0],
];

const controlPoints = bezierSpline.getControlPoints(points);
/*
[ [ 0.33333333333333337, 0.5, 0 ],
  [ 0.6666666666666667, 1, 0 ],
  [ 1.3333333333333333, 1, 0 ],
  [ 1.6666666666666665, 0.5, 0 ] ]
*/

const combined = bezierSpline.combinePoints(points, controlPoints);
/*
[ [ 0, 0, 0 ],
  [ 0.33333333333333337, 0.5, 0 ],
  [ 0.6666666666666667, 1, 0 ],
  [ 1, 1, 0 ],
  [ 1.3333333333333333, 1, 0 ],
  [ 1.6666666666666665, 0.5, 0 ],
  [ 2, 0, 0 ] ]
*/

const segments = bezierSpline.getSegments(combined);
/*
[ [ [ 0, 0, 0 ],
    [ 0.33333333333333337, 0.5, 0 ],
    [ 0.6666666666666667, 1, 0 ],
    [ 1, 1, 0 ] ],
  [ [ 1, 1, 0 ],
    [ 1.3333333333333333, 1, 0 ],
    [ 1.6666666666666665, 0.5, 0 ],
    [ 2, 0, 0 ] ] ]
*/
```

---

## real-world example

used in combination with [three.js](https://threejs.org/) and [@freder/piecewise](https://github.com/freder/piecewise) to get a bezier spline:

```javascript
const R = require('ramda');
const THREE = require('three');
const piecewise = require('@freder/piecewise');

/**
 * creates a bezier spline that is compatible with `THREE.Curve` in that it provides a `getPointAt()` method for sampling. control points are automatically calculated.
 * @param  {Array<THREE.Vector3>} onCurvePoints — list of on-curve points
 * @return {Object} spline
 */
function makeBezierSpline(onCurvePoints) {
	const points = onCurvePoints.map((p) => [p.x, p.y, p.z]);
	const bezierPoints = bezierSpline.combinePoints(
		points,
		bezierSpline.getControlPoints(points)
	);

	// make curve segments
	const listToVector3 = (coords) => (new THREE.Vector3(...coords));
	const curveSegments = bezierSpline.getSegments(bezierPoints)
		.map((segment) => (new THREE.CubicBezierCurve3(
				...segment.map(listToVector3)
			))
		);

	// calculate t intervals based on curve segments lengths:
	const segmentLengths = curveSegments.map((curve) => curve.getLength());
	const totalLength = R.sum(segmentLengths);
	const ts = segmentLengths.reduce(
		({ lenCounter, ts }, len, i) => {
			const _lenCounter = lenCounter + len;
			const t = _lenCounter / totalLength;
			const acc = {
				lenCounter: _lenCounter,
				ts: [...ts, t],
			};
			return (i === segmentLengths.length - 1)
				? acc.ts
				: acc;
		},
		{ lenCounter: 0, ts: [0] }
	);
	const tIntervals = R.zip(
		R.dropLast(1, ts),
		R.drop(1, ts)
	);

	const pieces = tIntervals.map((tInterval, i) => {
		return {
			tInterval,
			tMap: [0, 1],
			easingFn: (t) => curveSegments[i].getPointAt(t),
		};
	});

	return { getPointAt: piecewise.easing(pieces) };
};
```
