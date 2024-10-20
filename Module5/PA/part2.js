// Part 2 Task: Implement the PUT method to update an existing item in the to-do list.
// The PUT method should extract the index from the request URL, validate the index,
// read the updated item from the request body, and update the item in the list.

// Add dependency
const http = require("http");

// Retrieve the port number from the command line arguments
const port = process.argv[2];

// Check if a port number is provided and if it's valid (greater than or equal to 3000)
if (!port) {
  console.log("Missing Server Port Number");
  console.log("Usage: node todoServer.js [port number]");
  return;
} else if (port < 3000) {
  console.log("Port number must be greater or equal to 3000");
  return;
}

// Request handler – defined as a named arrow function expression
const reqHandler = (req, res) => {
  // Get the HTTP method
  switch (req.method) {
    case "GET":
      processGET(req, res);
      break;
    case "POST":
      processPOST(req, res);
      break;
    case "PUT":
      processPUT(req, res);
      break;
    case "DELETE":
      processDELETE(req, res);
      break;
  }
};

let items = ["Go biking", "Play tennis", "Finish assignment"];

// Create the server
const server = http.createServer(reqHandler);

// Server listens on the specified port
server.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

function processGET(req, res) {
  console.log("Process GET request");
  let response = "";

  items.forEach((element, idx) => {
    response += ++idx + ")" + element + "\n";
  });
  res.end(response);
}

function processPOST(req, res) {
  req.setEncoding("utf8");
  let item = "";
  req.on("data", (tmpData) => {
    item += tmpData;
  });

  req.on("end", () => {
    items.push(item);
    res.end("Item added");
    console.log(items);
  });
}

function processPUT(req, res) {
  let url = req.url;
  index = url.replace("/", "");

  if (
    Number.isNaN(parseInt(index)) ||
    parseInt(index) < 0 ||
    parseInt(index) >= items.length
  ) {
    res.end("Invalid index");
    return;
  }

  let updatedItem = "";
  req.setEncoding("utf8");
  req.on("data", (data) => {
    updatedItem += data;
  });
  req.on("end", () => {
    if (updatedItem.trim() == "") {
      res.end("Empty item is not allowed");
      return;
    }
    items[parseInt(index)] = updatedItem;
    res.end(`Item at index ${index} updated to: ${updatedItem}`); // Send response
    console.log(items);
  });
}

function processDELETE(req, res) {
  let url = req.url;
  //Assuming we are geting valid index
  index = url.replace("/", "");
  console.log(index);
  if (index === "") {
    res.end("Missing index from item to be deleted");
  } else if (Number.isNaN(parseInt(index))) {
    console.log("Index sent is invalid");
    res.end("Index is not invalid");
  } else {
    items.splice(parseInt(index), 1);
    res.end(`Item at index ${index} deleted`);
  }
}
