/*let list = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Uranus",
  "Neptune",
];

//Python list//
for (let planet of list) {
  console.log(planet);
}

//Java list//
for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}*/

// 1. Create a new file in VSCode and name it activity3.js
// 2. Create a JavaScript object called person that represents Alice
let person = {
    name: "Alice",
    age: 25,
    job: "dentist",
    hobbies: ["cooking", "photography"],
    sport: "tennis"
};

// 3. Print person using console.log
console.log(person);

// 4. Add gender as a new attribute to person
person.gender = "female";

// 5. Using dot notation update age to 31
person.age = 31;

// 6. Using bracket notation print the value of age to the console
console.log(person["age"]);

// 7. Using for/in loop iterate over the properties of person and print them to the console
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 8. Delete the property that has the value 'tennis'
delete person.sport;

// 9. Create an array of the keys of person
let keys = Object.keys(person);

// 10. Iterate over the array you have created in step (9) to print the key: value pairs in person as follows
console.log("Key: Value pairs in person:");
for (let key of keys) {
    console.log(`${key} : ${person[key]}`);
}

// 11. Create an array of the values of person
let values = Object.values(person);

// 12. Iterate over the array of values and print them out to the console as shown below
console.log("Printing the values");
for (let value of values) {
    console.log(value);
}
