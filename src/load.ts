
import {join} from 'path';

import {Config} from './Config';
import {MemoryConfig} from './MemoryConfig';
import {loadDirectory, merge} from './util';


/**
 * Load YAML configuration from directory path and environment
 *
 * @param	path	Directory path
 * @param	env		Environment
 * @return			Loaded YAML configuration
 */
export function load(path: string, env?: string): Config {

	let data = loadDirectory(path);

	if(env) {
		data = merge(data, loadDirectory(join(path, env)));
	}

	return new MemoryConfig(data);
}
