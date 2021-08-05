import { QueryFunc } from "./types";
export class Collection<T> {
  constructor(private data: T[], private save?: () => Promise<void>) {
    // save() method would only be provided if not in memory and is autosaving
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

 
  async insert(document: T) {

    this.data.push(document); // mutates

    // non in
    if (this.save) {
      await this.save();
    }

  }

  async insertMany(documents: T[]) { // spread operator
    documents.forEach((document) => {

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

  async removeOne(query: QueryFunc<T>) {
    const document = this.findOne(query);
    if (!document) {
      throw new Error("No document with that id exists");
    }

    const index = this.data.indexOf(document);

    this.data.splice(index, 1);

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

  async updateOne(query: QueryFunc<T>, updatedFields: Partial<T>) {
    const document = this.findOne(query);

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

  count(query?: QueryFunc<T>) {

    if (!query) {
      return this.data.length;
    }

    return this.data.filter(query).length; // applyQuery

  }

  async clear() {
    this.data = [];

    if (this.save) {
      await this.save();
    }
  }

  

  // private applyQuery(query: QueryFunc<T>) {

  //   return this.data.filter(query);

  // }
}

// getAll
// insert
// insertMany
// find
// findOne
// update
// updateOne
// remove
// removeOne
// count
// clear

// CRUD