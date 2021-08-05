import { JDB } from "./src";



const db = new JDB({ inMemory: true });

interface Person { 

    name: string,
    age: number
}

// interface City {
//     cityName: string,
//     population: number
// }

(async () => {

    // shouold users have to provide ids themselves?

    // const bob: Person = { name: "Bob", age: 6 }
    // const mary: Person = { name: "Mary", age: 9 }

    // db.setDefaults({ people: [bob, mary] });

    const people = db.collection<Person>("people"); // a
    
    // const citys = db.collection<City>("citys");

    // await people.insert({ name: "Mary", age: 8 });

    // const [first] = people.getAll();

    // console.log(first);

    // const id = first._id as string;
    // console.log(people);

    console.log(people.getAll())

    // console.log(people.getAll());

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