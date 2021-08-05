import { JDB } from "../src/index";

interface Person {

    name: string,
    age: number
}

const db = new JDB({ filePath: "./db.json", autoSave: false});
// for changes to be saved to the db file, db.save() must be called if autoSave is false
const people = db.collection<Person>("people");



(async () => {
    const bob: Person = { name: "Bob", age: 16 };
    const mary: Person = { name: "Mary", age: 19 };
    const john: Person = { name: "John", age: 15 };

    await db.load({ people: [bob, mary, john]})
    // db.load() must be called first to load data from the file path
    // default data can be provided if neccessary

    await people.insertMany([bob, mary, john]);
    // if db file does not exist, it is automatically created
    await db.save();
    
    console.log(people.find(person => person.age >= 16));

    console.log(people.findOne(person => person.name === "Bob"));

    await people.update(person => person.age >= 16, { age: 21} );
    
    await db.save();
    
    console.log(people.getAll());
})()