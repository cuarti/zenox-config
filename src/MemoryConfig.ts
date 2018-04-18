
import {Config} from './Config';


/**
 * Config implementation for memory
 */
export class MemoryConfig implements Config {

	/**
	 * Config data
	 */
	private data: object;

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

}
