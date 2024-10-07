let weekdays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

console.log(" Weekdays = " + weekdays);

weekdays.push("Thursday", "Friday");

console.log(" Weekdays = " + weekdays);

let workdays = weekdays.splice(-5, 5);

console.log("Workdays = " + workdays);

let mod_workdays = workdays.map((element, idx) => {
  return ++idx + ") " + element;
});

console.log(mod_workdays.join("\n"));

//use splice to remove wednesday
workdays.splice(2, 1);
console.log(workdays);

//use foreach to return a formaated string
let response = "";
workdays.forEach((element, idx) => {
  response += ++idx + ") " + element + "\n";
});

console.log(response);
