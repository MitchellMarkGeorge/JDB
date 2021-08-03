import { JDB } from "./src";

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

    const person = { name: "Bob", age: 6}
    await db.load({ people: [person]});

    const people = db.collection<Person>("people");

    // const citys = db.collection<City>("citys");

    people.insert({ name: "Mary", age: 9});

    // console.log(people.getAll());
    // console.log(db.data);
})()

// db.load({ posts: [new Date()], names: [""] })
// .then(() => console.log("loaded"))
// .catch((err) => console.log(err))