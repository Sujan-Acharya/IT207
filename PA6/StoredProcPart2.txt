DELIMITER //

CREATE PROCEDURE InsertSailor(
    IN name VARCHAR(25), 
    IN dob DATE, 
    IN rate INT, 
    OUT msg VARCHAR(250)
)
BEGIN
    DECLARE age INT;
    SET age = TIMESTAMPDIFF(YEAR, dob, CURDATE());
    
    IF age >= 24 THEN
        INSERT INTO Sailor (S_name, B_date, Rate) 
        VALUES (name, dob, rate);
        SET msg = 'Sailor added';
    ELSE
        SET msg = 'Sailor age is below allowed age';
    END IF;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE InsertReserves(
   IN p_sailor_id INT,
   IN p_boat_id INT,
   IN p_day DATE,
   OUT msg VARCHAR(250)
)
BEGIN
   DECLARE sailor_rate INT;
   DECLARE boat_type VARCHAR(50);
   
   -- Get sailor's rate
   SELECT Rate INTO sailor_rate 
   FROM Sailor 
   WHERE S_Id = p_sailor_id;
   
   -- Get boat type
   SELECT B_type INTO boat_type 
   FROM Boat 
   WHERE B_Id = p_boat_id;
   
   -- Apply business rules
   IF (boat_type = 'Fishing vessel' AND sailor_rate <= 7) OR
      (boat_type = 'Sailboat' AND sailor_rate <= 5) OR
      (sailor_rate <= 2 AND boat_type != 'Bass boat') THEN
       SET msg = 'Reservation cannot be done for requested boat - Sailor rate is low';
   ELSE
       INSERT INTO Reserves(S_Id, B_Id, Day)
       VALUES(p_sailor_id, p_boat_id, p_day);
       SET msg = 'Reservation Added';
   END IF;
END//

DELIMITER ;