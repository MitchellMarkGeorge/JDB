import { JsonObject } from "type-fest";
import { Data, Query } from "./types";
import fse from "fs-extra";
export class Collection<T = any> {
  constructor(private save: () => Promise<void>, private data: T[]) {
    // think about this
  }

  getAll() {
    return this.data;
  }

  // sync methods

  async insert(document: T) {
    this.data.push(document);
    await this.save();
  }

  async insertMany(documents: T[]) {
    documents.forEach((document) => {
      this.data.push(document);
    });

    await this.save();
  }

  count(query?: Query) {

    if (!query) {
        return this.data.length;
    }
    
  }

  private applyQuery(query?: any) {
    // return this.data.filter(document => )
  }
}
