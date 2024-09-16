const fs = require("fs");

let args = process.argv.length;

console.log("Number of args = " + args);

if (args <= 2) {
  console.log("Invalid number of arguments passed");
} else {
  for (let i = 2; i < args; i++) {
    fs.mkdirSync(process.argv[i]);
  }
}

let files = fs.readdirSync("./");
console.log("Directory content after creation:", files);

for (let i = 2; i < process.argv.length; i++) {
  fs.rmdirSync(process.argv[i]);
}

files = fs.readdirSync("./");
