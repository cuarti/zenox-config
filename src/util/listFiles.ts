
import {readdirSync} from 'fs';


/**
 * List YAML files of directory
 *
 * @param	path	Directory path
 * @return			YAML files
 */
export function listFiles(path: string): string[] {
	return readdirSync(path).filter(f => f.endsWith('.yml'));
}
