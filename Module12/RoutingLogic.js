const mysql = require("mysql2");
const fs = require("fs");
const http = require("http");
const { URL } = require("url");

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

//Create Database if not exists.

let create_db_sql = "CREATE DATABASE if not exists SwimDB;";

mysqlConnect.query(create_db_sql, (err) => {
  if (err) {
    console.log("Unable to create SwimDB database = " + err.code);
  }
});

let create_swimdb_tbls =
  " CREATE table if not exists Child (ChildID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ChildNAME VARCHAR(25) NOT NULL, \
 birthDate DATE NOT NULL); CREATE table if not exists Grp (grpNUM INT  NOT NULL AUTO_INCREMENT PRIMARY KEY, grpLevel VARCHAR(50) NOT NULL, \
 enrollment INT NOT NULL, startDATE DATE NOT NULL); CREATE TABLE if not exists REGISTER (ChildID INT NOT NULL, grpNUM INT NOT NULL,\
 CONSTRAINT FOREIGN KEY (ChildID) references Child(ChildID), CONSTRAINT FOREIGN KEY (grpNUM) REFERENCES grp(grpNUM),\
 PRIMARY KEY (ChildId, grpNUM))";

mysqlConnect.query("USE SwimDB", (err) => {
  if (err) throw err;
});

mysqlConnect.query(create_swimdb_tbls, (err) => {
  if (err) {
    console.log("Creating SwimDB tables = " + err.code);
  }
});

requestHandler = (req, res) => {
  const baseURL = "http://" + req.headers.host + "/";
  const { pathname, searchParams } = new URL(req.url, baseURL);
  const endpoint = pathname.split("/");
  const path = endpoint[1];
  let entries = searchParams.entries();
  const query = Object.fromEntries(entries);
  const method = req.method.toUpperCase();

  switch (method) {
    case "POST":
      res.end(`In ${method} in the ${path} path`);
      break;

    case "GET":
      res.end(`In ${method} in the ${path} path`);
      break;

    default:
      res.end("Invalid method");
  }
};

const server = http.createServer(requestHandler);

server.listen(3030, () => {
  console.log(" Server listening on port : 3030");
});
