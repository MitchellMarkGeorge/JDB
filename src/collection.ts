import { JsonObject } from "type-fest";
import { Data, Query, QueryFunc } from "./types";
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

  count(query?: T) {

    if (!query) {
      return this.data.length;
    }
    
    return this.applyQuery(query).length;

  }



  private applyQuery(query: T) {

    // reference
    // https://stackoverflow.com/questions/37301790/es6-equivalent-of-underscore-findwhere/37301940#37301940
    return this.data.filter((document) =>
      // all the properties in the query object must match
      Object.keys(query).every((key) => {

        return query[key as keyof T] === document[key as keyof T];
      })
    )
  }
}
