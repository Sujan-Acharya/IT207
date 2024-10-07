const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Missing arguments. Please provide a file name.");
  return;
}

const fileName = process.argv[2];

if (fs.existsSync(fileName)) {
  let fileContent = fs.readFileSync(fileName, "utf-8");

  function vowelCount(text) {
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
  }

  const count = vowelCount(fileContent);

  console.log("The number of vowels in the file is:", count);
} else {
  console.error("Error: File does not exist.");
  return;
}
