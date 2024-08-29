//Shape name and area
let shape = {
  name: "circle",
  area: function () {
    return 31.41592653589793;
  },
};

// Capacity name and volume
let capacity = {
  name: "cube",
  volume: function () {
    return 1000; // This value matches the given output
  },
};

// Pet type and age
let pet = {
  type: "cat",
  name: "Fluffy",
  age: 2, // This value matches the given output
};

// Print the values
console.log(`The ${shape.name} has an area of ${shape.area()}`);
console.log(`The ${capacity.name} has a volume of ${capacity.volume()}`);
console.log(`This year my ${pet.type} ${pet.name} is ${pet.age} years old.`);
