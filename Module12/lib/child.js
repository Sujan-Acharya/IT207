const mysql = require("mysql2");

exports.addChild = function (db, qs, cb) {
  let sql = "Call SWIMDB.Addchild(?,?,@msg); Select @msg";
  db.query(sql, [qs.childName, qs.birthDate], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      console.log(results[1][0]["@msg"]); //for debugging - to be printed on the Server terminal
      cb(200, "OK", results[1][0]["@msg"]);
    }
  });
};
