const mysql = require("mysql2");
const fs = require("fs");
const http = require("http");
const url = require("url"); // Add this at the top with your other imports
const sailor = require("./lib/sailor");
const boat = require("./lib/boat");
const reserve = require("./lib/reserve");

const mysqlConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$Sumit2015810",
  multipleStatements: true,
});

mysqlConnect.connect((err) => {
  if (err) {
    console.log(" Error connecting to database");
  } else {
    console.log("Successfully connected to db");
  }
});

let create_db_sql = "CREATE DATABASE if not exists SailDB;";

mysqlConnect.query(create_db_sql, (err) => {
  if (err) {
    console.log("Unable to create SailDB database = " + err.code);
  }
});

let create_saildb_tbls =
  " CREATE table if not exists Sailor (S_Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, S_name VARCHAR(25) NOT NULL, \
 B_date DATE NOT NULL, Rate INT NOT NULL); CREATE table if not exists Boat (B_Id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY, B_name VARCHAR(50) NOT NULL, \
 B_type VARCHAR(50) NOT NULL); CREATE TABLE if not exists Reserve (S_Id INT NOT NULL, B_Id INT NOT NULL, Day DATE NOT NULL, \
 CONSTRAINT FOREIGN KEY (S_Id) references Sailor(S_Id), CONSTRAINT FOREIGN KEY (B_Id) REFERENCES Boat(B_Id), \
 PRIMARY KEY (S_Id, B_Id))";

mysqlConnect.query("USE SailDB", (err) => {
  if (err) throw err;
});

mysqlConnect.query(create_saildb_tbls, (err) => {
  if (err) {
    console.log("Creating SailDB tables = " + err.code);
  }
});

requestHandler = (req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  const { pathname, searchParams } = new URL(req.url, baseURL);
  let entries = searchParams.entries();
  const query = Object.fromEntries(entries);
  const method = req.method.toUpperCase();
  console.log(" Path = " + pathname);
  switch (method) {
    case "POST":
      if (pathname === "/sailor" || pathname === "/sailor/") {
        // res.end(`In ${method} in the ${pathname} path`);
        sailor.addSailor(mysqlConnect, query, (statusCode, resStr, resMsg) => {
          res.writeHead(statusCode, resStr, { "content-type": "text/plain" });
          res.end(resMsg);
        });
      } else if (pathname == "/boat" || pathname == "/boat/") {
        // res.end(`In ${method} in the ${pathname} path`);
        boat.addBoat(mysqlConnect, query, (statusCode, resStr, resMsg) => {
          res.writeHead(statusCode, resStr, { "content-type": "text/plain" });
          res.end(resMsg);
        });
      } else if (pathname == "/reserve" || pathname == "/reserve/") {
      } else {
        res.end("Invalid path specified");
      }
      break;

    case "GET":
      if (pathname === "/sailor" || pathname === "/sailor/") {
        sailor.getSailor(
          mysqlConnect,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      } else if (pathname === "/boat" || pathname === "/boat/") {
        boat.getBoat(mysqlConnect, (statusCode, resStr, responseMessage) => {
          res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
          res.end(responseMessage);
        });
      }
      break;
    case "PUT":
      if (pathname === "/sailor" || pathname === "/sailor/") {
        // Handle format: localhost:3030/sailor/?S_Id=2&Rate=5&B_date=1993-12-19
        const query = url.parse(req.url, true).query;
        const updateData = {
          id: query.S_Id,
          rate: query.Rate,
          bdate: query.B_date,
          name: query.S_name,
        };

        sailor.updateSailor(
          mysqlConnect,
          updateData,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      } else if (pathname.startsWith("/sailor/")) {
        // Handle format: localhost:3030/sailor/2?Rate=5&B_date=1993-12-19
        const sailorId = pathname.split("/")[2];
        const query = url.parse(req.url, true).query;
        const updateData = {
          id: sailorId,
          rate: query.Rate,
          bdate: query.B_date,
          name: query.S_name,
        };

        sailor.updateSailor(
          mysqlConnect,
          updateData,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      } else if (pathname === "/boat" || pathname === "/boat/") {
        // Handle format: localhost:3030/boat/?B_Id=2&B_type=Sailboat&B_name=Serenity
        const query = url.parse(req.url, true).query;
        const updateData = {
          id: query.B_Id,
          type: query.B_type,
          name: query.B_name,
        };

        boat.updateBoat(
          mysqlConnect,
          updateData,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      } else if (pathname.startsWith("/boat/")) {
        // Handle format: localhost:3030/boat/2?B_type=Sailboat&B_name=Serenity
        const boatId = pathname.split("/")[2];
        const query = url.parse(req.url, true).query;
        const updateData = {
          id: boatId,
          type: query.B_type,
          name: query.B_name,
        };

        boat.updateBoat(
          mysqlConnect,
          updateData,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      }
      break;
    case "DELETE":
      if (pathname.startsWith("/sailor/")) {
        const sailorId = pathname.split("/")[2];
        sailor.deleteSailor(
          mysqlConnect,
          sailorId,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      } else if (pathname.startsWith("/boat/")) {
        const boatId = pathname.split("/")[2];
        boat.deleteBoat(
          mysqlConnect,
          boatId,
          (statusCode, resStr, responseMessage) => {
            res.writeHead(statusCode, resStr, { "Content-Type": "text/plain" });
            res.end(responseMessage);
          }
        );
      }
      break;
    default:
      res.end("Invalid method");
      break;
  }
};
const server = http.createServer(requestHandler);

server.listen(3030, () => {
  console.log("Server listening on port: 3030");
});
