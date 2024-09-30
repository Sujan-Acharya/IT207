// add the required dependencies as indicated by the variable name
const path = require("path");
const events = require("events");

// check the correct invocation of the program
if (process.argv.length < 4) {
  console.log(`Usage: ${path.basename(process.argv[1])} [word] [text]`);
  return;
}

// create a new event object
const myEvent = new events.EventEmitter();

// The handler for the event
const myEventHandler = (count, pos) => {
  if (count === 1) {
    console.log(`There is ${count} copy at position ${pos}`);
  } else if (count === 2) {
    console.log(`There is a ${count}nd copy at position ${pos}`);
  } else if (count === 3) {
    console.log(`There is a ${count}rd copy at position ${pos}`);
  } else {
    console.log(`There is a ${count}th copy at position ${pos}`);
  }
};

// Get the event name and the string from process.argv
const ename1 = process.argv[2];
const str = process.argv[3];

// fill in the parameters to listen to the event
myEvent.on(ename1, myEventHandler);

// find the position of the event name in the string
let pos = str.indexOf(ename1);
let cnt = 0;

while (pos > -1) {
  cnt++;
  // fill in the parameters to emit the event
  myEvent.emit(ename1, cnt, pos);

  // update the position for the next occurrence
  pos = str.indexOf(ename1, pos + 1);
}

console.log(`'${ename1}' is found ${cnt} times`);
