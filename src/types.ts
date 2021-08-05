import path from "path";
import { homedir } from "os";
import { nanoid } from "nanoid";
import is from "@sindresorhus/is";
import { isObject } from "util";

export interface JDBConfig {
    filePath?: string,
    autoSave?: boolean,
    inMemory?: boolean
    

}




export const DEFAULT_PATH = path.join(homedir(), "jdb.json"); // use package.json name instead
// export const DEFAULT_OPTIONS: JDBOptions = {
//     filePath: 
// }

export interface Data<T> {
    [key: string]: T[]
}

export type QueryFunc<T> = (document: T) => boolean;





