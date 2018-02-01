
import {load} from './load';


export interface Config {

	/**
	 * Get config from namespace if exists
	 *
	 * @param	namespace		Namespace config
	 * @return					Config value
	 */
	get<T>(namespace: string): T | undefined;

	/**
	 * Get config from namespace if exists or default value otherwise
	 *
	 * @param	namespace		Namespace config
	 * @param	defaultValue	Default value for config
	 * @return					Config value
	 */
	get<T>(namespace: string, defaultValue: T): T;

	/**
	 * Get all configurations
	 *
	 * @return	All configuration
	 */
	getAll<T extends object = object>(): T;

}

const {ZENOX_CONFIG_PATH, NODE_ENV} = process.env;

export const Config = load(ZENOX_CONFIG_PATH || 'config', NODE_ENV);
