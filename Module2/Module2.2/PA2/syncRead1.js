const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Missing arguments. Please provide a file name.");
  return;
}

const fileName = process.argv[2];

if (fs.existsSync(fileName)) {
  let fileContent = fs.readFileSync(fileName, "utf-8");

  let vowelCount = 0;
  for (let i = 0; i < fileContent.length; i++) {
    const char = fileContent[i].toLowerCase();
    if (
      char === "a" ||
      char === "e" ||
      char === "i" ||
      char === "o" ||
      char === "u"
    ) {
      vowelCount++;
    }
  }

  console.log("The number of vowels in the file is:", vowelCount);
} else {
  console.error("Error: File does not exist.");
  return;
}
