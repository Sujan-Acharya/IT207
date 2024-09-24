const fs = require("fs"); // add dependency
const path = require("path"); // add dependency

if (process.argv.length < 3) {
  // add condition to test for the correct program invocation
  console.log(
    `Missing arguments.\nCorrect Invocation: ${path.basename(
      __filename
    )} [folder name]`
  );
  return;
}

let foldername = process.argv[2]; // get foldername from process.argv
fs.readdir(foldername, (err, files) => {
  // fill in the required fields for readdir and callback function
  if (err) {
    // folder does not exist
    fs.mkdir(foldername, (err) => {
      // fill in the required fields for mkdir and callback function
      if (err) throw err;
      console.log("Folder created");
    });
  } else {
    let folderPath = path.join(__dirname, foldername); // fill in the required fields for path.join
    console.log(`The path to the folder: ${folderPath}`); // print folderPath using template String
  }
});
