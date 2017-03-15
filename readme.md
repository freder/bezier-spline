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

	const segments = bezierSpline.getSegments(bezierPoints)
		.map((segment) => (new THREE.CubicBezierCurve3(
				...segment
					.map((p) => (new THREE.Vector3(...p)))
			))
		);

	const tStep = 1 / segments.length;

	const intervals = segments
		.map((waypoint, i) => [
			i * tStep,
			(i + 1) * tStep
		]);

	const getPointAt = piecewise.easing(
		intervals.map((interval, i) => {
			return {
				tInterval: interval,
				tMap: [0, 1],
				easingFn: (t) => segments[i].getPointAt(t),
			};
		})
	);

	return { getPointAt };
};
```
