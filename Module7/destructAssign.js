//** Destructuring Objects
const car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
  color: "blue",
};

// TODO 1: Complete the Destructuring assignment to extract the
//car properties and print them to the terminal using the
//given console.log statements
const{make, model, year, color} = car;

// Logging the destructured values
console.log(`Make: ${make}`);
console.log(`Model: ${model}`);
console.log(`Year: ${year}`);
console.log(`Color: ${color}`);

//** Destructuring Arrays
const fruits = ["apple", "banana", "orange", "grape", "kiwi"];
const [firstFruit, secondFruit, ...remainingFruits] = fruits;
//TODO 2:Complete the Destructuring assignment to extract the
//values and print them to the terminal using the
//given console.log statements

// Logging the destructured values
console.log(`First fruit: ${firstFruit}`);
console.log(`Second fruit: ${secondFruit}`);
console.log(`Remaining fruits: ${remainingFruits}`);
