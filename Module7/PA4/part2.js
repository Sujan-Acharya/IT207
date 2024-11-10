/**
 * Part 2 - Using Query String for DELETE and PUT
 * - Uses query string parameter `index` to specify the item for DELETE and PUT methods.
 * - Parses URL with WHATWG API and extracts `index` using destructuring.
 * - Implements DELETE and PUT logic with query string for efficient item targeting.
 */
const http = require("http");
const { URL } = require("url");

const port = process.argv[2];

if (!port) {
  console.log("Missing Server Port Number");
  console.log("Usage: node todoServer.js [port number]");
  return;
} else if (port < 3000) {
  console.log("Port number must be greater or equal to 3000");
  return;
}

let items = ["Go biking", "Play tennis", "Finish assignment"];

const reqHandler = (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const { pathname, searchParams } = url; // Destructuring to extract pathname and searchParams
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

const server = http.createServer(reqHandler);

server.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

function processGET(req, res, pathname) {
  console.log("Process GET request");
  let response = "";
  items.forEach((element, idx) => {
    response += ++idx + ")" + element + "\n";
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
  const { index } = Object.fromEntries(searchParams);
  const parsedIndex = parseInt(index, 10) - 1;
  if (
    Number.isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= items.length
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

    items[parsedIndex] = updatedItem;

    res.end(`Item at index ${parsedIndex + 1} updated to: ${updatedItem}`); // Send response

    console.log(items);
  });
}
function processDELETE(req, res, searchParams) {
  const { index } = Object.fromEntries(searchParams);
  const parsedIndex = parseInt(index, 10) - 1;

  if (
    Number.isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= items.length
  ) {
    res.end("Out of bound index");
    return;
  }

  items.splice(parsedIndex, 1);
  res.end(`Item at index ${parsedIndex + 1} deleted`);
  console.log(items);
}
