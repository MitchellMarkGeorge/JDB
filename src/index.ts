// import { JDBOptions } from "./type/s";
import fse from "fs-extra";
import { nanoid } from "nanoid";
import { JsonObject } from "type-fest";
import { Collection } from "./collection";
import { Data, DEFAULT_PATH, JDBConfig } from "./types";

import onChange from "on-change";
export class JDB {
  private data!: Data<any>; // should i do this
  private filePath: string;
  private autoSave: boolean;
  private inMemory: boolean;
  //   private hasLoaded = false
  constructor(config: JDBConfig) {


    this.autoSave = config.autoSave || true;
    this.inMemory = config.inMemory || false;
    this.filePath = config.filePath || DEFAULT_PATH; // come back to this






    // this.data = {};
  } // autosave option

  public setDefaults(defaultData: Data<any>) {
    // this adds ids to all documents if there are none
    // should this be done in the Collection constructor?

    if (this.data) {
      throw new Error("No default needed")
    }
    Object.keys(defaultData).forEach(collectionName => {
      defaultData[collectionName].forEach((document => {
        if (!document?._id) {
          document._id = nanoid();
        }
      }))
    })
    this.data = defaultData;
  }



  public async load(defaultData?: Data<any>) {
    // method should ne be called again

    if (this.inMemory || this.data) {
      return; // throw error?
    }

    if (fse.existsSync(this.filePath)) {
      try {
        this.data = await fse.readJSON(this.filePath);
      } catch (error) {
        throw new Error("");
      }
    } else if (defaultData) {
      this.setDefaults(defaultData);
    } else {
      this.data = {};
    }

    if (!this.inMemory && this.autoSave) {
      this.data = onChange(this.data, async () => {
        await this.save();
      })
    }


  }

  public collection<T>(collectionName: string) {
    if (!this.data) {

      if (this.inMemory) {
        this.data = {}; // would only happen if no defaults are set
      } else {
        throw new Error("Error: db.load() must be called");
      }

    }
    // console.log(this.data[collectionName]);
    const collectionData: T[] = this.data[collectionName]?.length
      ? this.data[collectionName]
      : [];

    console.log(collectionData);
    // if (!this.data[collectionName]) {
    //     this.data[collectionName] = []
    // }


    if (this.inMemory) {
      return new Collection<T>(collectionData)
    }

    const saveFunc = this.save.bind(this);
    return new Collection<T>(collectionData, saveFunc);
  }

  private async save() {
    // use arrow function

    await fse.outputJSON(this.filePath, this.data);
  }

  //   public save = async () => { // use arrow function
  //       console.log(this.filePath);
  //       await fse.outputJSON(this.filePath, this.data);
  //   }
}
