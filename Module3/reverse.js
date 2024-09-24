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

let testText = "This is a test String\nThis is a second String";
console.log(`Original Text: \n${testText}`);
console.log(`Reversed Text: \n${reverseText(testText)}`);
