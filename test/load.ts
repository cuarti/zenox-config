
import {join} from 'path';

import {load} from '..';


test('load', () => {

	const path = join('test', 'config');

	expect(load(path).getAll()).toEqual({
		db: {domain: 'localhost', port: 1418},
		http: {port: 3000, domain: 'domain.com'}
	});

	expect(load(path, 'development').getAll()).toEqual({
		db: {domain: 'localhost', port: 1418},
		http: {port: 3001, domain: 'domain.com', subdomains: ['blog', 'admin']},
		log: {apiKey: '407b7635d6d331ba1343bbab31fb31'}
	});

	expect(load(path, 'production').getAll()).toEqual({
		db: {domain: 'localhost', port: 1418},
		http: {port: 3002, domain: 'domain.com'}
	});

	expect(load('config').getAll()).toEqual({});

});
