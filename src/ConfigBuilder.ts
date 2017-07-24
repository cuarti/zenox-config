
import {readdir} from 'fs';
import {join} from 'path';

import {Config, ConfigData} from './Config';


export class ConfigBuilder {

    public build(path: string, environment: string): Promise<Config> {

        let envPath = join(path, environment.toLowerCase());

        return Promise.all([
            this.readFolder(path).catch(() => Promise.resolve({})),
            this.readFolder(envPath).catch(() => Promise.resolve({}))
        ]).then<Config>(([data, envData]) => new Config(this.merge(data, envData)));

    }

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

            // if(obj2.hasOwnProperty(k)) {
            //     r[k] = typeof obj2[k] === 'object' ? this.merge()
            // } else {
            //     r[k] = obj1[k];
            // }

            // r[k] = obj2.hasOwnProperty(k) ? obj2[k] : obj1[k];

            return r;
        }, {});

    }

    private readFolder(path: string): Promise<ConfigData> {

        return new Promise((resolve, reject) => {
            readdir(path, (err, files) => {
                if(err) {
                    reject(err);
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

}
