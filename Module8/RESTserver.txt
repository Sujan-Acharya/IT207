const http = require("http");
const fs = require("fs");

const { URL } = require("url");

const todo_dir = "./todo";
const shop_dir = "./shop";

const todo_file = "./todo/todo.json";
const shop_file = "./shop/shop.json";

fs.readdir(todo_dir, (err, content) => {
  if (err) {
    fs.mkdir(todo_dir, (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(shop_dir, (err, content) => {
  if (err) {
    fs.mkdir(shop_dir, (err) => {
      if (err) throw err;
    });
  }
});

requestHandler = (req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  const { pathname, searchParams } = new URL(req.url, baseURL);
  const endpoint = pathname.split("/");
  const path = endpoint[1];
  const index = parseInt(endpoint[2], 10);
  console.log(" Path  = " + path + " index = " + index);
  let entries = searchParams.entries();
  const query = Object.fromEntries(entries);
  const method = req.method.toUpperCase();

  switch (method) {
    case "POST":
      if (path == "shop") {
        postHandler(shop_file, query, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHeader(statuscode);
          res.end(response);
          res.statuscode = 200;
        });
      } else if (path == "todo") {
        postHandler(todo_file, query, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHeader(statuscode);
          res.end(response);
          res.statuscode = 200;
        });
      } else {
        res.statuscode = 404;
        res.end(`In ${method} in an invalid path`);
      }
      break;

    case "GET":
      if (path == "shop") {
        getHandler(shop_file, index, res);
        res.statuscode = 200;
      } else if (path == "todo") {
        getHandler(todo_file, index, res);
        res.statuscode = 200;
      } else {
        res.statuscode = 404;
        res.end(`In ${method} in an invalid path`);
      }
      break;

    case "DELETE":
      if (path == "shop") {
        deleteHandler(shop_file, query, index, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHeader(statuscode);
          res.end(response);
          res.statuscode = 200;
        });
      } else if (path == "todo") {
        deleteHandler(todo_file, query, index, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHeader(statuscode);
          res.end(response);
          res.statuscode = 200;
        });
      } else {
        res.statuscode = 404;
        res.end(`In ${method} in an invalid path`);
      }
      break;

    case "PUT":
      if (path == "shop") {
        putHandler(shop_file, query, index, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHeader(statuscode);
          res.end(response);
          res.statuscode = 200;
        });
      } else if (path == "todo") {
        putHandler(todo_file, query, index, (statuscode, response) => {
          res.setHeader("content-type", 'text/plain; charset="utf-8"');
          res.writeHeader(statuscode);
          res.end(response);
          res.statuscode = 200;
        });
      } else {
        res.statuscode = 404;
        res.end(`In ${method} in an invalid path`);
      }
      break;
    default:
      res.end("Invalid method");
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
    list.push(newItem);
    console.log(" List Size = " + list);
    storeList(file, list);
    cb(200, "OK\n");
  });
};

const getHandler = (file, index, res) => {
  res.setHeader("content-type", "application/json");
  res.statuscode = 200;
  let rstream = fs.createReadStream(file);
  rstream.pipe(res);
  rstream.on("error", function (err) {
    if (err.code === "ENOENT") {
      res.statuscode = 404;
      res.end("NOT FOUND");
    } else {
      res.statuscode = 500;
      res.end("Internal Server Error");
    }
  });
};

const putHandler = (file, newItem, index, cb) => {
  loadInitializeList(file, index, (list, index) => {
    console.log(" List Size = " + list.length);
    console.log(" Item index = " + index);

    if (index < 1 || index > list.length) {
      cb(400, "BAD REQUEST\n");
      return;
    }
    let item = list[index - 1];
    let keys = Object.keys(newItem);
    for (let index = 0; index < keys.length; index++) {
      let key = keys[index];
      let value = newItem[key];
      console.log("Replacing Key = " + key + " value = " + value);
      item[key] = value;
    }
    storeList(file, list);
    cb(200, "OK\n");
  });
};

const deleteHandler = (file, newItem, index, cb) => {
  loadInitializeList(file, index, (list, index) => {
    console.log(" List Size = " + list);
    console.log(" Item index = ", index);

    if (index < 1 || index > list.length) {
      cb(400, "BAD REQUEST\n");
      return;
    }
    let mod_list = list.splice(index - 1, 1);

    storeList(file, list);
    cb(200, "OK\n");
  });
};

const server = http.createServer(requestHandler);

server.listen(3032, () => {
  console.log("Server listening on 3032");
});
