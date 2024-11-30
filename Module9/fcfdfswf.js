const http = require("http");
const fs = require("fs");

const { URL } = require("url");

const menu_dir = "./menu";
const welcome_dir = "./welcome";

const menu_file = "./menu/menu.json";
const welcome_file = "./welcome/welcome.txt";

fs.readdir(menu_dir, (err, content) => {
  if (err) {
    fs.mkdir(menu_dir, (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(welcome_dir, (err, content) => {
  if (err) {
    fs.mkdir(welcome_dir, (err) => {
      if (err) throw err;
    });
  }
});

fs.access(welcome_file, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFile(
      welcome_file,
      "Welcome To Chilly Delights\n\nMake unforgettable memories with our super chilly ice cream specialities.\nBring family and friends and enjoy some freezing moments",
      (err) => {
        if (err) throw err;
        console.log("Welcome to our server");
      }
    );
  }
});

requestHandler = (req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  const { pathname, searchParams } = new URL(req.url, baseURL);
  const endpoint = pathname.split("/");
  const path = endpoint[1] || "welcome";
  const code = endpoint[2]; // Extract the code from the path
  const method = req.method.toUpperCase();

  console.log("Path =", path, "Code =", code);

  switch (method) {
    case "GET":
      if (path === "menu") {
        getHandler(menu_file, code, res);
      } else {
        getHandler(welcome_file, code, res);
      }
      break;

    case "POST":
      if (path === "welcome") {
        res.statusCode = 405; // Method Not Allowed
        res.end("Method Not Allowed: POST is not supported on /welcome\n");
      } else if (path === "menu") {
        postHandler(
          menu_file,
          Object.fromEntries(searchParams),
          (statuscode, response) => {
            res.setHeader("content-type", 'text/plain; charset="utf-8"');
            res.writeHead(statuscode);
            res.end(response);
          }
        );
      } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
      break;

    case "PUT":
      if (path === "menu" && code) {
        putHandler(
          menu_file,
          Object.fromEntries(searchParams),
          code,
          (statuscode, response) => {
            res.setHeader("content-type", 'text/plain; charset="utf-8"');
            res.writeHead(statuscode);
            res.end(response);
          }
        );
      } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
      break;

    case "DELETE":
      if (path === "menu" && code) {
        deleteHandler(menu_file, code, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHead(statuscode);
          res.end(response);
        });
      } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
      }
      break;

    default:
      // Handle unsupported methods
      res.statusCode = 400;
      res.end("BAD REQUEST");
      break;
  }
};

function loadInitializeList(file, index, r_callback) {
  fs.readFile(file, (err, list) => {
    if (err) {
      console.log("Unable to read from file");
      list = [];
      r_callback(list, index);
    } else {
      console.log("List from file = " + list);
      const data_list = JSON.parse(list);
      console.log(" JS Array = " + JSON.stringify(data_list));
      r_callback(data_list, index);
    }
  });
}

function storeList(file, data) {
  let json_data = JSON.stringify(data);
  console.log("List = " + json_data);
  fs.writeFile(file, json_data, (err) => {
    if (err) {
      console.log("Error while writing to file");
    } else {
      console.log("Successfully saved the data to file");
    }
  });
}

const postHandler = (file, newItem, cb) => {
  loadInitializeList(file, 0, (list, index) => {
    console.log("Size of the list = " + list);

    // Check if the "code" already exists in the menu
    const isDuplicate = list.some((item) => item.code === newItem.code);

    if (isDuplicate) {
      console.log("Duplicate code detected.");
      cb(400, "Bad Request: Duplicate Code\n");
      return;
    }

    list.push(newItem);
    console.log(" List Size = " + list);
    storeList(file, list);
    cb(200, "OK\n");
  });
};

const getHandler = (file, code, res) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
      return;
    }

    // Check if the file is a JSON file
    if (file.endsWith(".json")) {
      try {
        const menu = JSON.parse(data);

        if (code) {
          const item = menu.find((item) => item.code === code);
          if (!item) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(item));
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(menu));
        }
      } catch (parseError) {
        res.statusCode = 500;
        res.end("Internal Server Error: Unable to parse JSON");
      }
    } else {
      // Handle plain text files
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(data);
    }
  });
};

const putHandler = (file, newItem, code, cb) => {
  loadInitializeList(file, 0, (list, index) => {
    const itemIndex = list.findIndex((item) => item.code === code);

    if (itemIndex === -1) {
      cb(404, "Not Found: No item with the given code\n");
      return;
    }

    const keys = Object.keys(newItem);
    keys.forEach((key) => {
      list[itemIndex][key] = newItem[key];
    });

    storeList(file, list);
    cb(200, "OK: Item updated successfully\n");
  });
};

const deleteHandler = (file, code, cb) => {
  loadInitializeList(file, 0, (list, index) => {
    const itemIndex = list.findIndex((item) => item.code === code);

    if (itemIndex === -1) {
      cb(404, "Not Found: No item with the given code\n");
      return;
    }

    list.splice(itemIndex, 1); // Remove the item from the list

    storeList(file, list);
    cb(200, "OK: Item deleted successfully\n");
  });
};

const server = http.createServer(requestHandler);

server.listen(3032, () => {
  console.log("Server listening on 3032");
});
