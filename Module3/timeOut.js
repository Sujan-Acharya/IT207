// The following code is for a simple for loop that prints out the value of j
for (let j = 0; j < 4; j++) {
  console.log("The value is: " + j);
}
setTimeout(function () {
  // the function code is written here
  for (let j = 3; j >= 0; j--) {
    console.log("The value is: " + j);
  }
}, 3000);
