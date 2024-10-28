let number = 56;

let groceries = [{ eggs: 5.3 }, { milk: 2.45 }, { cheese: 4.6 }];

let book = {
  name: "Node.Js in Action",
  authors: [
    "Mike Cantelon",
    " Marc Harter",
    "Nathan Rajlich",
    "T. J Holowaychuk",
  ],
  editions: [2013, 2014, 2017],
  publisher: "Manning Publications Co.",
  copies: 3,
  recent: function () {
    let today = new Date();
    let maxYr = Math.max(...this.editions);
    if (today - maxYr > 3) return true;
    return false;
  },
};
console.log(book);
console.log(book.recent());
console.log(groceries);
console.log(number);

// TODO: Stringfy all variables

let numberJson = JSON.stringify(number);
let groceriesJson = JSON.stringify(groceries);
let bookJson = JSON.stringify(book);

//TODO: Print out the stingfied varaible
console.log(numberJson);
console.log(groceriesJson);
console.log(bookJson);

//TODO: Parse the stringfied variables
let parsedBook = JSON.parse(bookJson);
let parsedgroceries = JSON.parse(groceriesJson);
let parseNumber = JSON.parse(numberJson);

//TODO:Print out the parsed variables and compare to the

console.log("Number Parsed " , numberJson);
console.log("Grocery Parsed " , groceriesJson);
console.log("Book Parsed " , bookJson);

//variables originally declared at the beginning of the code
