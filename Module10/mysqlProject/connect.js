const mysql = require("mysql2");
const fs = require("fs");
const operations = require("./lib/operations");

const mysqlConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$Sumit2015810",
});

mysqlConnect.connect((err) => {
  if (err) {
    console.log(" Error connecting to database");
  } else {
    console.log("Successfully connected to db");
  }
});

//Create Database if not exists.

let create_db_sql = "CREATE DATABASE if not exists StudTrack;";

mysqlConnect.query(create_db_sql, (err) => {
  if (err) {
    console.log("Unable to create STudTrack database = " + err.code);
  }
});

let create_student_tb =
  " CREATE table if not exists Students (S_CODE VARCHAR(10) NOT NULL PRIMARY KEY, S_NAME VARCHAR(25) NOT NULL, \
 S_YEAR ENUM ('1st', '2nd', '3rd', '4th'))";

let create_course_tb =
  " CREATE table if not exists course (C_CODE VARCHAR(10) NOT NULL PRIMARY KEY, c_NAME VARCHAR(255) NOT NULL, \
 C_BOOK VARCHAR(255) NOT NULL, S_YEAR ENUM ('1st', '2nd', '3rd', '4th'))";

let create_student_course_tb =
  " CREATE table if not exists studentcourse (S_CODE VARCHAR(10) NOT NULL, c_CODE VARCHAR(10) NOT NULL, \
 GRADE VARCHAR(2) NOT NULL, CONSTRAINT FOREIGN KEY (S_CODE) REFERENCES STUDENTS(S_CODE), CONSTRAINT FOREIGN KEY (C_CODE) REFERENCES COURSE(C_CODE),\
 PRIMARY KEY(S_CODE, C_CODE) )";

mysqlConnect.query("USE StudTrack", (err) => {
  if (err) throw err;
});

mysqlConnect.query(create_student_tb, (err) => {
  if (err) throw err;
  console.log("Created Students Table");
});

mysqlConnect.query(create_course_tb, (err) => {
  if (err) throw err;
  console.log("Created Course Table");
});

mysqlConnect.query(create_student_course_tb, (err) => {
  if (err) throw err;
  console.log("Created StudentCourse Table");
});

let op = process.argv[2];
let table = process.argv[3];

switch (op.toUpperCase()) {
  case "ADD":
    let buffer = fs.readFileSync("./s_obj.json");
    let obj = JSON.parse(buffer);
    console.log("Obj = ", obj);
    operations.add(mysqlConnect, table, obj, (results) => {
      console.log(results);
    });
    break;
  case "DELETE":
    let buffer_del = fs.readFileSync("./s_obj.json");
    let obj_del = JSON.parse(buffer_del);
    console.log("Obj = ", obj_del);
    operations.delete(mysqlConnect, table, obj_del, (results) => {
      console.log(results);
    });
    break;

  case "DISPLAY":
    operations.display(mysqlConnect, table, (results) => {
      console.log("The results are\n");
      console.log(results);
    });
    break;
  case "UPDATE":
    let buffer_upd = fs.readFileSync("./s_obj.json");
    let obj_upd = JSON.parse(buffer_upd);
    console.log("Obj = ", obj_upd);
    operations.update(mysqlConnect, table, obj_upd, (results) => {
      console.log(results);
    });
    break;
}

mysqlConnect.end((err) => {
  if (err) {
    console.log("Error while closing database connection");
  } else {
    console.log(" Database connection closed ...");
  }
});
