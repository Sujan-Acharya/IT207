const mysql = require("mysql2");

exports.add = function (conn, table, obj, cb) {
  let course_sql =
    "insert into StudTrack.Course (C_CODE, C_NAME, C_BOOK, S_YEAR) VALUES (?, ?, ?, ?)";
  let student_sql =
    " insert into StudTrack.Students (S_CODE, S_NAME, S_year) values (?, ?, ?)";
  let studcourse_sql =
    " insert into StudTrack.studentcourse (S_CODE, C_CODE, GRADE) values (?, ?, ?)";
  let sql = "";
  let values = [];

  if (table == "Students") {
    sql = student_sql;
    values = [obj.S_CODE, obj.S_NAME, obj.S_YEAR];
  } else if (table == "Course") {
    sql = course_sql;
    values = [obj.C_CODE, obj.C_NAME, obj.C_BOOK, obj.S_YEAR];
  } else {
    sql = studcourse_sql;
    values = [obj.S_CODE, obj.C_CODE, obj.GRADE];
  }

  conn.query(sql, values, (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.display = function (conn, table, cb) {
  let sql = "";
  if (table == "Students") {
    sql = " SELECT * from students";
  } else if (table == "Course") {
    sql = " SELECT * FROM Course";
  } else {
    sql = "SELECT * FROM StudentCourse";
  }
  conn.query(sql, (err, result) => {
    if (err) throw err;
    cb(result);
  });
};

exports.update = function (conn, table, obj, cb) {
  let course_sql = " update StudTrack.Course set C_YEAR = ? where C_CODE = ?";
  let student_sql =
    " UPDATE StudTrack.Students set S_YEAR = ? where S_CODE = ?";
  let studcourse_sql =
    " update StudTrack.StudentCourse set GRADE = ? where S_CODE = ? and C_CODE = ? ";
  let sql = "";
  let values = [];

  if (table == "Students") {
    sql = student_sql;
    values = [obj.S_YEAR, obj.S_CODE];
  } else if (table == "Course") {
    sql = course_sql;
    values = [obj.C_YEAR, obj.C_CODE];
  } else {
    sql = studcourse_sql;
    values = [obj.GRADE, obj.S_CODE, obj.C_CODE];
  }

  conn.query(sql, values, (err, results) => {
    if (err) throw err;
    cb(results);
  });
};

exports.delete = function (conn, table, obj, cb) {
  let student_sql = "DELETE FROM StudTrack.Students WHERE S_CODE = ?";
  let course_sql = "DELETE FROM StudTrack.Course WHERE C_CODE = ?";
  let studcourse_sql =
    "DELETE FROM StudTrack.StudentCourse WHERE S_CODE = ? AND C_CODE = ?";
  let sql = "";
  let values = [];

  if (table === "Students") {
    sql = student_sql;
    values = [obj.S_CODE];
  } else if (table === "Course") {
    sql = course_sql;
    values = [obj.C_CODE];
  } else {
    sql = studcourse_sql;
    values = [obj.S_CODE, obj.C_CODE];
  }

  conn.query(sql, values, (err, results) => {
    if (err) throw err;
    cb(results);
  });
};
