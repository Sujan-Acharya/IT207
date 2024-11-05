const fs = require("fs");

function loadInitializeList(file, cb) {
  fs.readFile(file, (err, list) => {
    if (err) {
      let list;
      console.log("data.json does not exist = ", list);
      cb(list);
    } else {
      let array_list = JSON.parse(list);
      //console.log("Data read = ", array_list);
      cb(list);
    }
  });
}

function storeList(file, native_array) {
  let json_array = JSON.stringify(native_array);
  fs.writeFile(file, json_array, (err) => {
    if (err) {
      console.log("Error writing nativce array to file. . .");
      throw err;
    }
  });
}

let callback = (list) => {
  if (list.length == 0) {
    list = process.argv[2];
  }

  let array_list = JSON.parse(list);
  console.log("Data read = ", array_list);
  array_list.forEach((element, idx) => {
    array_list[idx] = element * 2;
  });
  console.log("Doubled Array = ", array_list);
  storeList("data.json", array_list);
};

loadInitializeList("data1.json", callback);
