
import fse from "fs-extra";
import { Collection } from "./collection";
import { Data, DEFAULT_PATH, JDBConfig } from "./types";


export class JDB {
  private data!: Data<any>;
  private filePath: string;
  private autoSave: boolean;
  private inMemory: boolean;

  /**
   * 
   * @param config 
   */
  constructor(config: JDBConfig) {

    this.autoSave = config.autoSave || true;
    this.inMemory = config.inMemory || false;
    this.filePath = config.filePath || DEFAULT_PATH; // come back to this

  }


  public async load(defaultData?: Data<any>) {

    // if db is in memeory or data is loaded, return early
    // no data needs to be loaded
    if (this.inMemory || this.data) {
      // no data needs to be loaded
      return; // throw error?
    }

    // if data is being loaded from a file

    // is the db file exists read it and set the data
    if (fse.existsSync(this.filePath)) {

      this.data = await fse.readJSON(this.filePath);

    } else if (defaultData) {
      // if no file is avalible to read and default data is provided,
      // set the default data
      this.data = defaultData;
    } else {
      // if no file or default data, set it as empty object
      this.data = {};
    }

  }

  public collection<T>(collectionName: string) {
    if (!this.data) {
      // if there is no data (should only happen if in memory)
      if (this.inMemory) {
        this.data = {}; // would only happen if no defaults are set
      } else {
        throw new Error("Error: db.load() must be called");
      }

    }

    const collectionData: T[] = this.data[collectionName]?.length
      ? this.data[collectionName]
      : [];



    if (this.inMemory || !this.autoSave) {
      // if not autoSave, the user will need to call db.save();
      // also if the db is in memory, no save method is needed
      return new Collection<T>(collectionData)
    }
    // for non in memory and autosave, give Collection object copy of save func to automaticlly save after changes
    const saveFunc = this.save.bind(this);
    return new Collection<T>(collectionData, saveFunc);


  }

  public async save() {
    // should not be able to call save() if in memory
    // ONLY CALL IF NOT AUTO SAVING


    if (this.inMemory) {
      throw new Error("Not allowed to save when in memory");
    }
    await fse.outputJSON(this.filePath, this.data);
  }

  //   public save = async () => { // use arrow function
  //       console.log(this.filePath);
  //       await fse.outputJSON(this.filePath, this.data);
  //   }
}
