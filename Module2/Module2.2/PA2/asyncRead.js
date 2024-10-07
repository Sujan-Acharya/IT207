/**
 * Task:
 * - Use `fs.readFile` (asynchronous) instead of `fs.readFileSync` (synchronous).
 * - Use a callback to process the file content.
 * - Convert `vowelCount` to an arrow function.
 * - Handle errors and print the total vowel count.
 */

const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Missing arguments. Please provide a file name.");
  return;
}

const fileName = process.argv[2];

fs.readFile(fileName, "utf-8", (err, fileContent) => {
  if (err) {
    console.log("Error reading the file:", err.message);
    return;
  }

  const vowelCount = (text) => {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toLowerCase();
      if (
        char === "a" ||
        char === "e" ||
        char === "i" ||
        char === "o" ||
        char === "u"
      ) {
        count++;
      }
    }
    return count;
  };

  const count = vowelCount(fileContent);

  console.log("The number of vowels in the file is:", count);
});
