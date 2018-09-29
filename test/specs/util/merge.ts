
import {merge} from '../../../src/util';


test('merge', () => {

	expect(merge({name: 'joe'}, {age: 12})).toEqual({name: 'joe', age: 12});
	expect(merge({name: 'joe', age: 12}, {name: 'jake'})).toEqual({name: 'jake', age: 12});

});
