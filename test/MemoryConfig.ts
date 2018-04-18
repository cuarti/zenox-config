
import {MemoryConfig} from '..';


const config = new MemoryConfig({
	http: {port: 3000, domain: 'domain.com', plugins: {session: true}},
	db: {port: 1418, domain: 'localhost'}
});


test('MemoryConfig~get', () => {

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

test('MemoryConfig~getAll()', () => {

	expect(config.getAll()).toEqual({
		http: {port: 3000, domain: 'domain.com', plugins: {session: true}},
		db: {port: 1418, domain: 'localhost'}
	});

});
