
import {join} from 'path';
import {loadDirectory} from '../../src/util';


test('loadDirectory', () => {

	const path = join('test', 'config');

	expect(loadDirectory(path)).toEqual({
		db: {domain: 'localhost', port: 1418},
		http: {port: 3000, domain: 'domain.com'}
	});

	expect(loadDirectory(join(path, 'development'))).toEqual({
		http: {port: 3001, subdomains: ['blog', 'admin']},
		log: {apiKey: '407b7635d6d331ba1343bbab31fb31'}
	});

	expect(loadDirectory(join(path, 'production'))).toEqual({
		http: {port: 3002}
	});

	expect(loadDirectory('config')).toEqual({});

});
