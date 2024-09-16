const path = require("path");

let dirname = path.dirname(__dirname);
console.log("dirname = " + dirname);
let folders = dirname.split("/");
for (folder in folders) {
  console.log("folders = " + folders[folder]);
}

let newdirname = "/";

for (folder in folders) {
  newdirname = path.join(newdirname, folders[folder]);
}

console.log(newdirname);
