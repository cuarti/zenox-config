
import {join} from 'path';

import {ConfigService} from '../..';


const config = new ConfigService({
	http: {port: 3000, domain: 'domain.com', plugins: {session: true}},
	db: {port: 1418, domain: 'localhost'}
});


describe('ConfigService', () => {

	test('#get', () => {

		expect(config.get('http')).toEqual({port: 3000, domain: 'domain.com', plugins: {session: true}});
		expect(config.get('log')).not.toBeDefined();
		expect(config.get('log', true)).toBe(true);
		expect(config.get('http.port')).toBe(3000);
		expect(config.get('http.port', 80)).toBe(3000);
		expect(config.get('http.sessionId')).not.toBeDefined();
		expect(config.get('http.sessionId', 'secret')).toBe('secret');
		expect(config.get('http.plugins')).toEqual({session: true});
		expect(config.get('http.plugins', {})).toEqual({session: true});
		expect(config.get('http.plugins.session')).toBe(true);
		expect(config.get('http.plugins.session', false)).toBe(true);

	});

	test('#getAll()', () => {

		expect(config.getAll()).toEqual({
			http: {port: 3000, domain: 'domain.com', plugins: {session: true}},
			db: {port: 1418, domain: 'localhost'}
		});

	});

	test('fromYaml', () => {

		const path = join('test', 'config');

		expect(ConfigService.fromYaml(path).getAll()).toEqual({
			db: {domain: 'localhost', port: 1418},
			http: {port: 3000, domain: 'domain.com'}
		});

		expect(ConfigService.fromYaml(path, 'development').getAll()).toEqual({
			db: {domain: 'localhost', port: 1418},
			http: {port: 3001, domain: 'domain.com', subdomains: ['blog', 'admin']},
			log: {apiKey: '407b7635d6d331ba1343bbab31fb31'}
		});

		expect(ConfigService.fromYaml(path, 'production').getAll()).toEqual({
			db: {domain: 'localhost', port: 1418},
			http: {port: 3002, domain: 'domain.com'}
		});

		expect(ConfigService.fromYaml('config').getAll()).toEqual({});

	});

});
