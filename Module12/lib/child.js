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

exports.childList = function (db, qs, cb) {
  let sql = `Call SWIMDB.ChildList(?)`;
  db.query(sql, [`${qs.grpNum}`], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      let rows = results[0]
        .map((item) => {
          return item.childName + " " + item.birthDate.toDateString();
        })
        .join("\n");
      rows += "\n";
      console.log(rows);
      cb(200, "OK", rows);
    }
  });
};
