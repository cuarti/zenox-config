
import {join} from 'path';

import {Config} from './Config';
import {loadDirectory, merge} from './util';


/**
 * Config basic implementation
 */
export class ConfigService implements Config {

	/**
	 * Config data
	 */
	private readonly data: object;

	/**
	 * Constructor method
	 *
	 * @param	data	Config data
	 */
	public constructor(data: object) {
		this.data = data;
	}

	public get<T>(namespace: string, defaultValue?: T): T | undefined {

		let value = namespace.split('.').reduce((r, k) => r && r[k], this.data);

		return value || defaultValue;
	}

	public getAll<T extends object = object>(): T {
		return this.data as T;
	}

	/**
	 * Create config from YAML config directory and environment
	 *
	 * @param	path	Config directory
	 * @param 	env		Environment
	 * @return			Config
	 */
	public static fromYaml(path: string, env?: string): Config {

		let data = loadDirectory(path);

		if(env) {
			data = merge(data, loadDirectory(join(path, env)));
		}

		return new ConfigService(data);
	}

}
