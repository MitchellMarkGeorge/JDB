import { JDB } from "./src";
import { Query } from "./src/types";

const db = new JDB("./test.json");

interface Person {
    
    name: string,
    age: number
}

// interface City {
//     cityName: string,
//     population: number
// }

(async () => {

    const person = { name: "Bob", age: 6 }
    await db.load({ people: [person] });

    const people = db.collection<Person>("people");

    // const citys = db.collection<City>("citys");

    people.insert({ name: "Mary", age: 9 });

    // people.insert({ _id: })
    // console.log(people.getAll());
    // console.log(db.data);
})()

// db.load({ posts: [new Date()], names: [""] })
// .then(() => console.log("loaded"))
// .catch((err) => console.log(err))

// const data = [{ name: "Bob", age: 6, human: {genders: 2} }, { name: "Bobby", age: 6 }, { name: "Mary", age: 9 }]
// function applyQuery(query: Query, arr: any[]) {
//     return arr.filter((document) =>
//     // all the properties in 
//         Object.keys(query).every((key) => {
           
//             return query[key] === document[key];
//         })
//     )
// }

// console.log(applyQuery({ human: { genders: 2} }, data))