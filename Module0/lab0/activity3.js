//Sujan Acharya

// Step 2:
let person = {
  name: "Alice",
  age: 25,
  job: "dentist",
  sport: "tennis",
  hobby: ["cooking", "photography"],
};
// Step 3:
console.log(person);

// Step 4:
person.gender = "female";

// Step 5:
person.age = 31;

// Step 6:
console.log(person["age"]);

// Step 7:
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// Step 8:
delete person.sport;
//step 9:
let keyArray = Object.keys(person);

// Step 10:
for (let i = 0; i < keyArray.length; i++) {
  let key = keyArray[i];
  console.log(key + " : " + person[key]);
}
// Step 11:
let valuesArray = Object.values(person);

// Step 12:
console.log("Printing the values");
for (let i = 0; i < valuesArray.length; i++) {
  console.log(valuesArray[i]);
}
