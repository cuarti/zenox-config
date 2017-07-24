

export interface ConfigData {
    [key: string]: any;
}

export class Config {

    private data: ConfigData;

    public constructor(data: ConfigData) {
        this.data = data;
    }

    public get<T>(): T {

        return null;
    }

    public getAll(): ConfigData {
        return this.data;
    }

}
