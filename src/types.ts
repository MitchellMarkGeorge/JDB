import path from "path";
import { homedir } from "os";

export interface JDBConfig {
    filePath?: string,
    autoSave?: boolean,
    inMemory?: boolean
    // autoload: boolean,

}


export const DEFAULT_PATH = path.join(homedir(), "jdb.json"); // use package.json name instead
// export const DEFAULT_OPTIONS: JDBOptions = {
//     filePath: 
// }

export interface Data<T extends { _id?: string }> {
    [key: string]: (T)[]
}

export interface Query {
    [key: string]: any
}

export type QueryFunc<T> = (document: T) => boolean;

// export function deepMerge<T>(target: T, source: Partial<T> | T) {

//     const isObject = (item: T) => {
//         return (item && typeof item === 'object' && !Array.isArray(item));
//       }

//     Object.keys(source).forEach((key) => {
//         if (isObject(target[key keyof ]))
//     }) 
// }

// deepMerge({name: "me"}, {age: 4});