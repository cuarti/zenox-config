

/**
 * Config data
 *
 * @todo    Abstract it in @agama/types as AssignableObject<T = any> for assign new properties to object
 */
export interface ConfigData {
    [key: string]: any;
}

/**
 * Config set
 */
export class Config {

    private data: ConfigData;

    /**
     * Constructor method
     *
     * @param   data    Config data
     */
    public constructor(data: ConfigData) {
        this.data = data;
    }

    /**
     * Get config value by namespace
     *
     * @param   namespace   Config namespace
     * @returns             Config value
     */
    public get<T>(namespace: string): T {
        return namespace.split('.').reduce((r, k) => r[k], this.data);
    }

    /**
     * Get all config values
     *
     * @returns {ConfigData}
     */
    public getAll(): ConfigData {
        return this.data;
    }

}
