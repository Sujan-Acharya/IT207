// Combined Node.js server code for Part 1 and Part 2 of the assignment.

const http = require("http");
const { URL } = require("url"); // Import the URL class from the 'url' module to handle URL parsing using WHATWG API

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

let items = ["Go biking", "Play tennis", "Finish assignment"];

// Request handler – defined as a named arrow function expression
const reqHandler = (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const { pathname, searchParams } = url; // Destructuring to extract pathname and searchParams

  // Get the HTTP method
  switch (req.method) {
    case "GET":
      processGET(req, res, pathname);
      break;
    case "POST":
      processPOST(req, res, pathname);
      break;
    case "PUT":
      processPUT(req, res, searchParams);
      break;
    case "DELETE":
      processDELETE(req, res, searchParams);
      break;
  }
};

// Create the server
const server = http.createServer(reqHandler);
// Server listens on the specified port
server.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

function processGET(req, res, pathname) {
  console.log("Process GET request");
  let response = "";
  items.forEach((element, idx) => {
    response += idx + 1 + ")" + element + "\n";
  });
  res.end(response);
}

function processPOST(req, res, pathname) {
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

function processPUT(req, res, searchParams) {
  const { index } = Object.fromEntries(searchParams); // Destructure 'index' from searchParams
  const parsedIndex = parseInt(index, 10) - 1; // Convert to zero-based index

  // Validate index
  if (
    Number.isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= items.length
  ) {
    res.end("Invalid or missing index for item to be updated");
    return;
  }

  let updatedItem = "";
  req.setEncoding("utf8");
  req.on("data", (data) => {
    updatedItem += data;
  });
  req.on("end", () => {
    if (updatedItem.trim() === "") {
      res.end("Empty item is not allowed");
      return;
    }

    items[parsedIndex] = updatedItem;
    res.end(`Item at index ${parsedIndex + 1} updated to: ${updatedItem}`);

    console.log(items); // Log updated list
  });
}

function processDELETE(req, res, searchParams) {
  const { index } = Object.fromEntries(searchParams); // Destructure 'index' from searchParams
  const parsedIndex = parseInt(index, 10) - 1; // Convert to zero-based index

  // Validate index
  if (
    Number.isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= items.length
  ) {
    res.end("Invalid or missing index for item to be deleted");
    return;
  }

  // Delete the item
  items.splice(parsedIndex, 1);
  res.end(`Item at index ${parsedIndex + 1} deleted`); // Respond with confirmation
  console.log(items); // Log updated list
}
