const mysql = require("mysql2");

exports.addGroup = function (conn, qs, cb) {
  let sql = "Call SWIMDB.AddGroup(?,?,?,@msg); Select @msg";
  conn.query(sql, [qs.grpLevel, 1, qs.startDate], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      console.log(results[1][0]["@msg"]); //for debugging - to be printed on the Server terminal
      cb(200, "OK", results[1][0]["@msg"]);
    }
  });
};

exports.getGroupCount = function (db, qs, cb) {
  let sql = "CALL SWIMDB.GetGroupCount(?,@cnt); Select @cnt";
  db.query(sql, [qs.level], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      let message = `The number of groups at the ${qs.level} is ${results[1][0]["@cnt"]}`;
      console.log(message);
      cb(200, "OK", message);
    }
  });
};
