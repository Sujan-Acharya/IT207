const mysql = require("mysql2");

exports.addRegister = function (conn, childID, grpNum, cb) {
  let sql = "Call SWIMDB.AddRegistration(?, ?, @msg); Select @msg";
  conn.query(sql, [childID, grpNum], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      console.log(results[1][0]["@msg"]); //for debugging - to be printed on the Server terminal
      cb(200, "OK", results[1][0]["@msg"]);
    }
  });
};
