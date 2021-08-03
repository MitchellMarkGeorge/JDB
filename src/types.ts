import path from "path";
import { homedir } from "os";

// export interface JDBOptions {
//     filePath: string,
        // autoSave:
//     // autoload: boolean,
    
// }


export const DEFAULT_PATH = path.join(homedir(), "jdb.json");
// export const DEFAULT_OPTIONS: JDBOptions = {
//     filePath: 
// }

export interface Data<T> {
    [key: string]: T[]
}

export interface Query {
    [key: string]: any
}