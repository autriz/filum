import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	let tableNames = [
		'session',
		'accounts',
		'users',
		'businesses',
		'businessContact',
		'tag',
		'businessTag',
		'services',
		'serviceTag',
		'reviews'
	];

	return tableNames.includes(param);
};
