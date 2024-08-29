// Activity5
// Create 3 objects for 3 pets
let pet1 = {
  name: "Fluffy",
  color: "orange",
  type: "cat",
};

let pet2 = {
  name: "Stuffy",
  color: "white",
  type: "hamster",
};

let pet3 = {
  name: "Bluffy",
  color: "brown",
  type: "dog",
};

// Use the 3 objects created as values for the keys of a fourth object
let myPets = {
  number: 3,
  pet1: pet1,
  pet2: pet2,
  pet3: pet3,
};

// Output
console.log(
  `I have ${myPets.number} pets. Their names are ${myPets.pet1.name}, ${myPets.pet2.name}, and ${myPets.pet3.name}.`
);
console.log(
  `${myPets.pet1.name} is an ${myPets.pet1.color} ${myPets.pet1.type}, ${myPets.pet2.name} is a ${myPets.pet2.color} ${myPets.pet2.type} and ${myPets.pet3.name} is a ${myPets.pet3.color} ${myPets.pet3.type}.`
);
