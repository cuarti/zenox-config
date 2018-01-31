
import {readFileSync} from 'fs';
import {join} from 'path';
import {load} from 'js-yaml';

import {listFiles} from './listFiles';


/**
 * Load YAML configuration files from directory
 *
 * @param	path	Directory path
 * @return			Config
 */
export function loadDirectory(path: string): object {

	try {
		return listFiles(path).reduce((r, file) => {

			let name = file.substring(0, file.length - 4);
			r[name] = load(readFileSync(join(path, file), 'utf8'));

			return r;
		}, {});

	} catch(err) {
		return {};
	}

}
