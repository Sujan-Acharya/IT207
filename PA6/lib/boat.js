const mysql = require("mysql2");

exports.addBoat = function (db, qs, cb) {
  let sql = "Call SAILDB.AddBoat(?,?,@msg); Select @msg";
  db.query(sql, [qs.B_name, qs.B_type], (err, results) => {
    if (err) {
      let message = "Internal server error";
      cb(500, message, message);
    } else {
      console.log(results[1][0]["@msg"]); //for debugging - to be printed on the Server terminal
      cb(200, "OK", results[1][0]["@msg"]);
    }
  });
};

exports.getBoat = function (db, cb) {
  let sql = "SELECT B_Id, B_name, B_type FROM Boat";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      cb(500, "Internal server error", "Database query failed");
    } else {
      if (results.length === 0) {
        cb(404, "Not Found", "Boat table is empty");
      } else {
        const boatData = results
          .map((boat) => `${boat.B_Id} ${boat.B_name} ${boat.B_type}`)
          .join("\n");

        cb(200, "OK", boatData);
      }
    }
  });
};

exports.updateBoat = function (db, updateData, cb) {
  const updates = [];
  const values = [];

  if (updateData.name !== undefined) {
    updates.push("B_name = ?");
    values.push(updateData.name);
  }
  if (updateData.type !== undefined) {
    updates.push("B_type = ?");
    values.push(updateData.type);
  }

  if (updates.length === 0 || !updateData.id) {
    return cb(400, "Bad Request", "Missing required data");
  }

  values.push(updateData.id);

  const sql = `UPDATE Boat SET ${updates.join(", ")} WHERE B_Id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      cb(500, "Internal Server Error", "Database update failed");
    } else {
      if (result.affectedRows === 0) {
        cb(404, "Not Found", `Boat with ID ${updateData.id} not found`);
      } else {
        cb(200, "OK", `Boat ${updateData.id} updated successfully`);
      }
    }
  });
};

exports.deleteBoat = function (db, boatId, cb) {
  const sql = "DELETE FROM Boat WHERE B_Id = ?";

  db.query(sql, [boatId], (err, result) => {
    if (err) {
      console.error(err);
      cb(500, "Internal Server Error", "Database delete failed");
    } else {
      if (result.affectedRows === 0) {
        cb(404, "Not Found", `Boat with ID ${boatId} not found`);
      } else {
        cb(200, "OK", `Boat ${boatId} deleted successfully`);
      }
    }
  });
};
