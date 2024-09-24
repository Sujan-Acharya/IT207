const fs = require("fs");
const path = require("path");

function reverseText(text) {
  let lines = text.split("\n");
  let finalReversedstring = "";
  for (let i = lines.length; i > 0; --i) {
    const reversedString = lines[i - 1].split(" ").reverse();
    const joinedString = reversedString.join(" ");
    finalReversedstring = finalReversedstring + joinedString + "\n";
  }
  return finalReversedstring;
}

if (process.argv.length < 4) {
  // add condition to test for the correct program invocation
  console.log(
    `Missing arguments.\nCorrect Invocation: ${path.basename(
      __filename
    )} [filename] [text]`
  );
  return;
}
let filename = process.argv[2]; // get filename from process.argv
let text = process.argv[3]; // get text from process.argv
let reverseTxt = reverseText(text);
fs.readFile(filename, (err, content) => {
  // fill in the required fields for readFile
  if (err) {
    // the file does not exist
    fs.writeFile(filename, reverseTxt, (err) => {
      // fill in the required fields for writeFile
      if (err) throw err;
      console.log("File is created");
    });
  } else {
    // if the file exists
    let newText = `\n${reverseTxt}`;
    fs.appendFile(filename, newText, (err) => {
      // fill in the required fields for append
      if (err) throw err;
      console.log("Text appended to file");
    });
  }
});
