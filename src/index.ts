// import { JDBOptions } from "./type/s";
import fse from "fs-extra";
import { JsonObject } from "type-fest";
import { Collection } from "./collection";
import { Data, DEFAULT_PATH } from "./types";
export class JDB {
  private data!: Data<any>; // should i do this
  //   private hasLoaded = false
  constructor(private filePath: string = DEFAULT_PATH) {
    // this.data = {};
  } // autosave option

  

  public async load(defaultData?: Data<any>) {
    // method should ne be called again

    if (fse.existsSync(this.filePath)) {
      try {
        this.data = await fse.readJSON(this.filePath);
      } catch (error) {
        throw new Error("");
      }
    } else if (defaultData) {
      this.data = defaultData;
    } else {
      this.data = {};
    }
  }

  public collection<T>(collectionName: string) {
    if (!this.data) {
      throw new Error("Error: db.load() must be called");
    }

    const collectionData: T[] = this.data[collectionName]?.length
      ? this.data[collectionName]
      : [];

    // if (!this.data[collectionName]) {
    //     this.data[collectionName] = []
    // }

    const saveFunc = this.save.bind(this);
    return new Collection<T>(saveFunc, collectionData);
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
