
import {join} from 'path';

import {ConfigService} from './ConfigService';


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

const {ZENOX_PROJECT_DIR, ZENOX_CONFIG_DIR, NODE_ENV} = process.env;

const path = ZENOX_CONFIG_DIR || join(ZENOX_PROJECT_DIR || process.cwd(), 'config');
const env = NODE_ENV || 'development';

export const Config: Config = ConfigService.fromYaml(path, env);
