# @freder/bezier-spline

automatically generates control points for a list of on-curve bezier points. – core code is based on [https://www.particleincell.com/2012/bezier-splines/](http://www.particleincell.com/2012/bezier-splines/ )

```javascript
const bezierSpline = require('@freder/bezier-spline');
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
