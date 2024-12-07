const mysql = require("mysql2");

const mysqlConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$Sumit2015810",
  multipleStatements: true,
});

mysqlConnect.connect((err) => {
  if (err) {
    console.error("Error connecting to database");
  } else {
    console.log("Successfully connected to the database");
  }
});

// Create the database
const createDatabase = `
  CREATE DATABASE IF NOT EXISTS SailingAdventure;
  USE SailingAdventure;
`;

// Create tables
const createTables = `
  CREATE TABLE IF NOT EXISTS Sailors (
    S_Id INT AUTO_INCREMENT PRIMARY KEY,
    S_Name VARCHAR(50) NOT NULL,
    B_Date DATE NOT NULL,
    Rate INT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Boats (
    B_Id INT AUTO_INCREMENT PRIMARY KEY,
    B_Name VARCHAR(50) NOT NULL,
    B_Type VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Reserves (
    S_Id INT NOT NULL,
    B_Id INT NOT NULL,
    Day DATE NOT NULL,
    PRIMARY KEY (S_Id, B_Id, Day),
    FOREIGN KEY (S_Id) REFERENCES Sailors(S_Id),
    FOREIGN KEY (B_Id) REFERENCES Boats(B_Id)
  );
`;

mysqlConnect.query(createDatabase + createTables, (err) => {
  if (err) {
    console.error("Error creating database or tables", err.message);
  } else {
    console.log("Database and tables created successfully");
  }
  mysqlConnect.end();
});
