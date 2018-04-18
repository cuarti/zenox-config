

/**
 * Merge two objects
 *
 * @param	a	First object to merge
 * @param	b	Second object to merge
 * @return		Merged object
 */
export function merge(a: object = {}, b: object = {}): object {

	let keys = Object.keys(a).concat(Object.keys(b))
		.filter((k, i, arr) => arr.indexOf(k, i + 1) < 0);

	return keys.reduce((r, k) => {

		if(!b.hasOwnProperty(k)) {
			r[k] = a[k];

		} else if(typeof b[k] === 'object' && !(b[k] instanceof Array)) {
			r[k] = merge(a[k], b[k]);

		} else {
			r[k] = b[k];
		}

		return r;
	}, {});

}
