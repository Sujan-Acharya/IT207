exports.getReserves = function (db, cb) {
  let sql = `
        SELECT r.S_Id, s.S_name AS Sailor_Name, r.B_Id, b.B_name AS Boat_Name, DATE_FORMAT(r.Day, '%a %b %d %Y') as Day 
        FROM Reserves r
        JOIN Sailor s ON r.S_Id = s.S_Id
        JOIN Boat b ON r.B_Id = b.B_Id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      cb(500, "Internal server error", "Database query failed");
    } else {
      if (results.length === 0) {
        cb(404, "Not Found", "Reserve table is empty");
      } else {
        const reserveData = results
          .map(
            (reserve) =>
              `${reserve.S_Id} ${reserve.Sailor_Name} ${reserve.B_Id} ${reserve.Boat_Name} ${reserve.Day}`
          )
          .join("\n");

        cb(200, "OK", reserveData);
      }
    }
  });
};
exports.addReserves = function (db, qs, cb) {
  let sql = "CALL AddReserves(?, ?, ?, @msg); SELECT @msg";
  db.query(sql, [qs.S_Id, qs.B_Id, qs.Day], (err, results) => {
    if (err) {
      cb(500, "Error", err.sqlMessage);
    } else {
      const msg = results[1][0]["@msg"];
      if (msg === "Reservation Added") {
        cb(200, "OK", msg);
      } else {
        cb(400, "Bad Request", msg);
      }
    }
  });
};
exports.deleteReserves = function (db, sailorId, boatId, day, cb) {
  // Added day parameter
  // Log the received parameters for debugging
  console.log("Received parameters:", { sailorId, boatId, day });

  const sql = "DELETE FROM Reserves WHERE S_Id = ? AND B_Id = ? AND Day = ?";

  db.query(sql, [sailorId, boatId, day], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      cb(500, "Internal Server Error", "Database delete failed");
    } else {
      if (result.affectedRows === 0) {
        cb(
          404,
          "Not Found",
          `Reservation with Sailor ID ${sailorId} and Boat ID ${boatId} not found`
        );
      } else {
        cb(200, "OK", "Reservation has been deleted");
      }
    }
  });
};
