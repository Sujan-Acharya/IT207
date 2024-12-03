const mysql = require('mysql2');
const fs = require('fs');

const mysqlConnect = mysql.createConnection ({host : "localhost", user : "root", password : "$Sumit2015810", multipleStatements: true});

mysqlConnect.connect((err) => {
    if (err) {
        console.log (" Error connecting to database");
    } else {
        console.log ("Successfully connected to db");
    }
});

//Create Database if not exists.

let create_db_sql = "CREATE DATABASE if not exists SwimDB;";

mysqlConnect.query(create_db_sql, (err) => {
    if (err) {
    console.log("Unable to create SwimDB database = "+ err.code);
    }
});

let create_swimdb_tbls = " CREATE table if not exists Child (ChildID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ChildNAME VARCHAR(25) NOT NULL, \
 birthDate DATE NOT NULL); CREATE table if not exists Grp (grpNUM INT  NOT NULL AUTO_INCREMENT PRIMARY KEY, grpLevel VARCHAR(50) NOT NULL, \
 enrollment INT NOT NULL, startDATE DATE NOT NULL); CREATE TABLE if not exists REGISTER (ChildID INT NOT NULL, grpNUM INT NOT NULL,\
 CONSTRAINT FOREIGN KEY (ChildID) references Child(ChildID), CONSTRAINT FOREIGN KEY (grpNUM) REFERENCES grp(grpNUM),\
 PRIMARY KEY (ChildId, grpNUM))";
 
 mysqlConnect.query("USE SwimDB", (err)=> {
    if (err) throw err;
 });

mysqlConnect.query(create_swimdb_tbls, (err) => {
    if (err) {
    console.log("Creating SwimDB tables = "+ err.code);
    }
});

mysqlConnect.end((err) => {
    if (err) {
        console.log ("Error while closing database connection");
    } else {
        console.log (" Database connection closed ...");
    }
});
