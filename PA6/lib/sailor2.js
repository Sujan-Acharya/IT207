const mysql = require("mysql2");

exports.InsertSailor = function (db, qs, cb) {
  let sql = "Call AddSailor(?,?,?,@msg); Select @msg";
  db.query(sql, [qs.S_name, qs.B_date, qs.Rate], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      console.log(results[1][0]["@msg"]); //for debugging - to be printed on the Server terminal
      cb(200, "OK", results[1][0]["@msg"]);
    }
  });
};
exports.getSailor = function (db, cb) {
  let sql = "SELECT S_Id, S_name, Rate FROM Sailor";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      cb(500, "Internal server error", "Database query failed");
    } else {
      if (results.length === 0) {
        cb(404, "Not Found", "Sailor table is empty");
      } else {
        const sailorData = results
          .map((sailor) => `${sailor.S_Id} ${sailor.S_name} ${sailor.Rate}`)
          .join("\n");

        cb(200, "OK", sailorData);
      }
    }
  });
};

exports.updateSailor = function (db, updateData, cb) {
  const updates = [];
  const values = [];

  if (updateData.name !== undefined) {
    updates.push("S_name = ?");
    values.push(updateData.name);
  }
  if (updateData.rate !== undefined) {
    updates.push("Rate = ?");
    values.push(updateData.rate);
  }
  if (updateData.bdate !== undefined) {
    updates.push("B_date = ?");
    values.push(updateData.bdate);
  }

  if (updates.length === 0 || !updateData.id) {
    return cb(400, "Bad Request", "Missing required data");
  }

  values.push(updateData.id);

  const sql = `UPDATE Sailor SET ${updates.join(", ")} WHERE S_Id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      cb(500, "Internal Server Error", "Database update failed");
    } else {
      if (result.affectedRows === 0) {
        cb(404, "Not Found", `Sailor with ID ${updateData.id} not found`);
      } else {
        cb(200, "OK", `Sailor ${updateData.id} updated successfully`);
      }
    }
  });
};

exports.deleteSailor = function (db, sailorId, cb) {
  const sql = "DELETE FROM Sailor WHERE S_Id = ?";

  db.query(sql, [sailorId], (err, result) => {
    if (err) {
      console.error(err);
      cb(500, "Internal Server Error", "Database delete failed");
    } else {
      if (result.affectedRows === 0) {
        cb(404, "Not Found", `Sailor with ID ${sailorId} not found`);
      } else {
        cb(200, "OK", `Sailor ${sailorId} deleted successfully`);
      }
    }
  });
};
