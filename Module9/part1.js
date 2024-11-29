const fs = require("fs");
const http = require("http");
const { URL } = require("url");

const menuFile = "./menu.json";
const welcomeFile = "./welcome.txt";

// Load and initialize the list
function loadInitializeList(file, cb) {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

// Store the list to the file
function storeList(file, list) {
  fs.writeFile(file, JSON.stringify(list), (err) => {
    if (err) {
      console.log("Error: File cannot be written");
    } else {
      console.log("The file has been successfully written");
    }
  });
}

// Create the welcome file if it doesn't exist
function ensureWelcomeFile() {
  if (!fs.existsSync(welcomeFile)) {
    fs.writeFile(welcomeFile, "Welcome to the Menu API!", (err) => {
      if (err) {
        console.error("Error creating welcome.txt:", err);
      } else {
        console.log("welcome.txt created successfully");
      }
    });
  }
}

// Handle the welcome endpoint
function handleWelcomeEndpoint(res) {
  res.setHeader("Content-Type", 'text/plain; charset="utf8"');
  const stream = fs.createReadStream(welcomeFile);
  stream.pipe(res);
  stream.on("error", (err) => {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.end("NOT FOUND");
    } else {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });
}

// Handle POST requests to the menu
function handlePostMenu(req, res) {
  ensureWelcomeFile(); // Ensure the welcome.txt file is created
  const baseURL = "http://" + req.headers.host + "/";
  const { searchParams } = new URL(req.url, baseURL);

  const requiredFields = ["code", "name", "ingredient", "price", "avail"];
  const newMenuItem = {};

  for (const [key, value] of searchParams.entries()) {
    if (key === "price") {
      newMenuItem[key] = parseFloat(value);
    } else if (key === "avail") {
      newMenuItem[key] = value === "true";
    } else if (key === "ingredient") {
      newMenuItem[key] = value.split(",").map((item) => item.trim());
    } else {
      newMenuItem[key] = value;
    }
  }

  for (const field of requiredFields) {
    if (!(field in newMenuItem)) {
      res.statusCode = 400;
      res.end(`Missing required field: ${field}`);
      return;
    }
  }

  loadInitializeList(menuFile, (menu) => {
    if (menu.some((item) => item.code === newMenuItem.code)) {
      res.statusCode = 400;
      res.end("Duplicate Entry");
    } else {
      menu.push(newMenuItem);
      storeList(menuFile, menu);
      res.statusCode = 200;
      res.end("Item Added");
    }
  });
}

// Handle GET requests to the menu
function handleGetMenu(res) {
  res.setHeader("Content-Type", "application/json");
  const stream = fs.createReadStream(menuFile);
  stream.pipe(res);
  stream.on("error", (err) => {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });
}

// Handle PUT requests to update menu items
function handlePutMenu(req, res, code) {
  const baseURL = "http://" + req.headers.host + "/";
  const { searchParams } = new URL(req.url, baseURL);

  loadInitializeList(menuFile, (menu) => {
    const index = menu.findIndex((item) => item.code === code);
    if (index === -1) {
      res.statusCode = 404;
      res.end("Item Not Found");
    } else {
      const itemToUpdate = menu[index];
      for (const [key, value] of searchParams.entries()) {
        if (key === "price") {
          itemToUpdate[key] = parseFloat(value);
        } else if (key === "avail") {
          itemToUpdate[key] = value === "true";
        } else if (key === "ingredient") {
          itemToUpdate[key] = value.split(",").map((item) => item.trim());
        } else {
          itemToUpdate[key] = value;
        }
      }
      storeList(menuFile, menu);
      res.statusCode = 200;
      res.end("Item Updated");
    }
  });
}

// Handle DELETE requests to remove menu items
function handleDeleteMenu(res, code) {
  loadInitializeList(menuFile, (menu) => {
    const updatedMenu = menu.filter((item) => item.code !== code);
    if (updatedMenu.length === menu.length) {
      res.statusCode = 404;
      res.end("Item not found");
    } else {
      storeList(menuFile, updatedMenu);
      res.statusCode = 200;
      res.end(`Item with code ${code} deleted successfully`);
    }
  });
}

// Main request handler
const requestHandler = (req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  const { pathname } = new URL(req.url, baseURL);
  const path = pathname.split("/")[1];
  const code = pathname.split("/")[2];
  const method = req.method;

  switch (path) {
    case "welcome":
      if (method === "GET") {
        handleWelcomeEndpoint(res);
      } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
      break;

    case "menu":
      if (method === "POST") handlePostMenu(req, res);
      else if (method === "GET") handleGetMenu(res);
      else if (method === "PUT" && code) handlePutMenu(req, res, code);
      else if (method === "DELETE" && code) handleDeleteMenu(res, code);
      else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
      break;

    default:
      res.statusCode = 404;
      res.end("Not Found");
  }
};

// Start the server
const server = http.createServer(requestHandler);
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
