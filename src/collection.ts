import { QueryFunc } from "./types";
import { nanoid } from "nanoid";
export class Collection<T extends { _id?: string }> {
  constructor( private data: T[], private save?: () => Promise<void>) {
    // think about this
    // this is for default data without ids

    // filter?
    // shoyld this be done here
    
    // this.data.forEach(document => {
    //   if (!document?._id) {
    //     document._id = nanoid();
    //   }
    // })
  }



  getAll() {
    return this.data;
  }

  find(query: QueryFunc<T>) {
    return this.data.filter(query);
  }

  findOne(query: QueryFunc<T>) {
    return this.data.find(query)
  }

  findByID(id: string) {
    return this.data.find(document => document._id === id);
  }

  // sync methods

  async insert(document: T) {
    if (!document._id) {
      document._id = nanoid();
    }
    this.data.push(document);

    if (this.save) {
      await this.save();
    }
    
  }

  async insertMany(documents: T[]) {
    documents.forEach((document) => {
      if (!document._id) {
        document._id = nanoid();
      }
      this.data.push(document);
    });

    if (this.save) {
      await this.save();
    }
  }

  async remove(query: QueryFunc<T>) {
    const documentsToRemove = this.data.filter(query);
    if (!documentsToRemove.length) return;
    documentsToRemove.forEach((document) => {
      const index = this.data.indexOf(document);

      if (index !== -1) {// will never happen
        this.data.splice(index, 1)
      }
    })

    if (this.save) {
      await this.save();
    }
  }

  async removeByID(id: string) {
    const document = this.findByID(id);
    if (!document) {
      throw new Error("No document with that id exists");
    }

    const index = this.data.indexOf(document);

    this.data.splice(index, 1);

    if (this.save) {
      await this.save();
    }
  }

  async updateByID(id: string, updatedFields: Partial<T>) {
    const document = this.findByID(id);

    if (!document) {
      throw new Error("No document with that id exists");
    }
    // for now use shallow 
    const updatedDocument = Object.assign(document, updatedFields);

    // is all of this neccecarry
    const index = this.data.indexOf(document);

    this.data[index] = updatedDocument;

    if (this.save) {
      await this.save();
    }
  }

  async update(query: QueryFunc<T>, updatedFields: Partial<T>) {
    const documents = this.data.filter(query);

    if (!documents.length) return;

    documents.forEach(document => {
      // for now use shallow 
    const updatedDocument = Object.assign(document, updatedFields);

    // is all of this neccecarry
    const index = this.data.indexOf(document);

    this.data[index] = updatedDocument;
    })

    if (this.save) {
      await this.save();
    }
  }

  count(query?: QueryFunc<T>) {

    if (!query) {
      return this.data.length;
    }
    
    return this.applyQuery(query).length;

  }

  async clear() {
    this.data = [];
    
    if (this.save) {
      await this.save();
    }
  }



  private applyQuery(query: QueryFunc<T>) {

    // reference
    // https://stackoverflow.com/questions/37301790/es6-equivalent-of-underscore-findwhere/37301940#37301940
    return this.data.filter(query);
    
  }
}
