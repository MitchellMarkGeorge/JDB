import path from "path";
import { homedir } from "os";

export interface JDBConfig {
    filePath?: string,
    autoSave?: boolean,
    inMemory?: boolean
    

}




export const DEFAULT_PATH = path.join(homedir(), "jdb.json"); // use package.json name instead

export const DEFAULT_OPTIONS: JDBConfig = {
    filePath: DEFAULT_PATH,
    autoSave: true,
    inMemory: false

}

export interface Data<T> {
    [key: string]: T[]
}

export type QueryFunc<T> = (document: T) => boolean;





