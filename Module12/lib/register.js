const mysql = require("mysql2");
exports.addRegistration = function (conn, qs, cb) {
  let sql = "Call SWIMDB.AddRegistration(?,?,@msg); Select @msg";
  conn.query(sql, [qs.childID, qs.grpNum], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      console.log(results[1][0]["@msg"]); //for debugging - to be printed on the Server terminal
      cb(200, "OK", results[1][0]["@msg"]);
    }
  });
};
