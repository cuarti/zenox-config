
import {load} from './load';


export interface Config {

	/**
	 * Get config from namespace
	 *
	 * @param	namespace		Namespace config
	 * @param	defaultValue	Default value for config
	 * @return					Config value
	 */
	get<T>(namespace: string, defaultValue?: T): T;

	/**
	 * Get all configurations
	 *
	 * @return	All configuration
	 */
	getAll<T extends object = object>(): T;

}

const {ZENOX_CONFIG_PATH, NODE_ENV} = process.env;

export const Config = load(ZENOX_CONFIG_PATH, NODE_ENV);
