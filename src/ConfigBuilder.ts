
import {readdir} from 'fs';
import {join} from 'path';

import {Config, ConfigData} from './Config';


/**
 * Builder for config
 */
export class ConfigBuilder {

    private path: string;
    private environment: string;

    /**
     * Constructor method
     *
     * @param   path        Base config path
     * @param   environment Environment value
     */
    public constructor(path: string, environment?: string) {
        this.path = path;
        this.environment = environment;
    }

    /**
     * Build config object
     *
     * @returns Config set
     */
    public build(): Promise<Config> {

        let envPath = join(this.path, this.environment.toLowerCase());

        return Promise.all([
            this.readFolder(this.path),
            this.readFolder(envPath)
        ]).then<Config>(([data, envData]) => new Config(this.merge(data, envData)));

    }

    /**
     * Get config data from folder
     *
     * @param   path    Folder path
     * @returns         Config stored in folder files
     */
    private readFolder(path: string): Promise<ConfigData> {

        return new Promise(resolve => {
            readdir(path, (err, files) => {
                if(err) {
                    resolve({});
                } else {
                    resolve(files.reduce((r, f) => {

                        if(f.endsWith('.js')) {

                            let name = f.substring(0, f.length - 3);
                            r[name] = require(join(path, f));
                        }

                        return r;
                    }, {}));
                }
            });
        });

    }

    /**
     * Merge two objects in new one
     *
     * @param   obj1    First object to merge
     * @param   obj2    Second object to merge
     * @returns         Merged object
     * @todo            Abstract it in @agama/types
     */
    private merge(obj1: Object = {}, obj2: Object = {}): Object {

        let keys = Object.keys(obj1).concat(Object.keys(obj2))
            .filter((k, i, arr) => arr.indexOf(k, i + 1) < 0);

        return keys.reduce((r, k) => {

            if(!obj2.hasOwnProperty(k)) {
                r[k] = obj1[k];

            } else if(typeof obj2[k] === 'object' && !(obj2[k] instanceof Array)) {
                r[k] = this.merge(obj1[k], obj2[k]);

            } else {
                r[k] = obj2[k];
            }

            return r;
        }, {});

    }

}
