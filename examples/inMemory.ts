import { JDB } from "../src/index";

interface Person {

    name: string,
    age: number
}

const db = new JDB({ inMemory: true });

const people = db.collection<Person>("people");



(async () => {
    const bob: Person = { name: "Bob", age: 16 };
    const mary: Person = { name: "Mary", age: 19 };
    const john: Person = { name: "John", age: 15 };

    await people.insertMany([bob, mary, john]);

    
    console.log(people.find(person => person.age >= 16));

    console.log(people.findOne(person => person.name === "Bob"));

    await people.update(person => person.age >= 16, { age: 21} );

    
    console.log(people.getAll());
})()
