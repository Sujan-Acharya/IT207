// Add dependency
const http = require("http");

// Retrieve the port number from the command line arguments
const port = process.argv[2];

// Make sure port number is given
if (!port) {
  console.log("Missing Server Port Number");
  return;
} else if (port <= 3000) {
  // Check if a port number is provided and if it's valid (greater than or equal to 3000)
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

// Server listens on the specified port and prints port number
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

function processPUT(req, res) {}

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
