
import {join} from 'path';

import {listFiles} from '../../../src/util';


test('listFiles', () => {

	const path = join('test', 'config');

	expect(listFiles(path)).toEqual(['db.yml', 'http.yml']);
	expect(listFiles(join(path, 'development'))).toEqual(['http.yml', 'log.yml']);
	expect(listFiles(join(path, 'production'))).toEqual(['http.yml']);
	expect(listFiles('config')).toEqual([]);

});
