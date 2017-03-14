const R = require('ramda');

module.exports =
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
