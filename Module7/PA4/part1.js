/**
 * Part 1 - Using WHATWG URL API
 * - Replaces deprecated URL parsing with the WHATWG URL API.
 * - Extracts pathname using destructuring assignment.
 * - Sets up base code for Part 2 .
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
  let index = pathname.replace("/", "");
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
function processDELETE(req, res, searchParams) {
  let index = pathname.replace("/", "");
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
