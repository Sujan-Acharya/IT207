                                                                       -- Stored Procedures for sailor.js

DELIMITER //

CREATE PROCEDURE AddSailor(IN name VARCHAR(25), IN dob DATE, IN rate INT, OUT msg VARCHAR(250))
BEGIN
    DECLARE status VARCHAR(50) DEFAULT " ";

    INSERT INTO Sailor (S_name, B_date, Rate) VALUES (name, dob, rate);

    SET status = "Sailor is added";

    SET msg = status;
END;
//

DELIMITER ;



DELIMITER $$
CREATE PROCEDURE GetSailor(OUT msg VARCHAR(255))
BEGIN
  IF (SELECT COUNT(*) FROM sailor) = 0 THEN
    SET msg = "Sailor Table is empty";
  ELSE
    SELECT * FROM sailor;
    SET msg = "All sailors retrieved successfully.";
  END IF;
END$$
DELIMITER ;


DELIMITER //

CREATE PROCEDURE UpdateSailor(
    IN sailor_id INT,
    IN new_name VARCHAR(25),
    IN new_dob DATE,
    IN new_rate INT,
    OUT msg VARCHAR(250)
)
BEGIN
    DECLARE sailor_exists INT;
    DECLARE status VARCHAR(100) DEFAULT '';
    
    SELECT COUNT(*) INTO sailor_exists 
    FROM Sailor 
    WHERE S_id = sailor_id;
    
    IF sailor_exists = 0 THEN
        SET status = CONCAT('No sailor found with ID: ', sailor_id);
    ELSE
        UPDATE Sailor 
        SET 
            S_name = CASE 
                WHEN new_name IS NOT NULL THEN new_name 
                ELSE S_name 
            END,
            B_date = CASE 
                WHEN new_dob IS NOT NULL THEN new_dob 
                ELSE B_date 
            END,
            Rate = CASE 
                WHEN new_rate IS NOT NULL THEN new_rate 
                ELSE Rate 
            END
        WHERE S_id = sailor_id;
        
        SET status = CONCAT('Sailor with ID: ', sailor_id, ' updated successfully');
    END IF;
    
    SET msg = status;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE DeleteSailor(
    IN sailor_id INT,
    OUT msg VARCHAR(250)
)
BEGIN
    DECLARE sailor_exists INT;
    DECLARE status VARCHAR(100) DEFAULT '';
    
    SELECT COUNT(*) INTO sailor_exists 
    FROM Sailor 
    WHERE S_id = sailor_id;
    
    IF sailor_exists = 0 THEN
        SET status = CONCAT('No sailor found with ID: ', sailor_id);
    ELSE
        DELETE FROM Sailor 
        WHERE S_id = sailor_id;
        
        SET status = CONCAT('Sailor with ID: ', sailor_id, ' deleted successfully');
    END IF;
    
    SET msg = status;
END //

DELIMITER ;



                                                                            -- Stores Procedure for boat.js --




DELIMITER //

CREATE PROCEDURE AddBoat(
    IN name VARCHAR(50), 
    IN type VARCHAR(50), 
    OUT msg VARCHAR(250)
)
BEGIN
    DECLARE status VARCHAR(50) DEFAULT '';

    INSERT INTO Boat (B_name, B_type) VALUES (name, type);

    SET status = 'Boat is added';

    SET msg = status;
END;
//

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetBoat(OUT msg VARCHAR(255))
BEGIN
    IF (SELECT COUNT(*) FROM boat) = 0 THEN
        SET msg = 'Boat Table is empty';
    ELSE
        SELECT * FROM boat;
        SET msg = 'All boats retrieved successfully.';
    END IF;
END$$

DELIMITER ;

DELIMITER //

CREATE PROCEDURE UpdateBoat(
    IN p_B_Id INT,
    IN p_B_name VARCHAR(50),
    IN p_B_type VARCHAR(50),
    OUT msg VARCHAR(250)
)
BEGIN
    DECLARE boat_exists INT;
    DECLARE status VARCHAR(100) DEFAULT '';
    
    SELECT COUNT(*) INTO boat_exists 
    FROM Boat 
    WHERE B_Id = p_B_Id;
    
    IF boat_exists = 0 THEN
        SET status = CONCAT('No boat found with ID: ', p_B_Id);
    ELSE
        UPDATE Boat 
        SET 
            B_name = CASE 
                WHEN p_B_name IS NOT NULL THEN p_B_name 
                ELSE B_name 
            END,
            B_type = CASE 
                WHEN p_B_type IS NOT NULL THEN p_B_type 
                ELSE B_type 
            END
        WHERE B_Id = p_B_Id;
        
        SET status = CONCAT('Boat with ID: ', p_B_Id, ' updated successfully');
    END IF;
        SET msg = status;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE DeleteBoat(
    IN boat_id INT,
    OUT msg VARCHAR(250)
)
BEGIN
    DECLARE boat_exists INT;
    DECLARE status VARCHAR(100) DEFAULT '';
        SELECT COUNT(*) INTO boat_exists 
    FROM Boat 
    WHERE B_Id = boat_id;
    
    IF boat_exists = 0 THEN
        SET status = CONCAT('No boat found with ID: ', boat_id);
    ELSE
        DELETE FROM Boat 
        WHERE B_Id = boat_id;
        
        SET status = CONCAT('Boat with ID: ', boat_id, ' deleted successfully');
    END IF;
        SET msg = status;
END //

DELIMITER ;


                                                                     -- Stores Procedure for reserve.js --


DELIMITER $$

CREATE PROCEDURE AddReserves(
    IN p_sailor_id INT,
    IN p_boat_id INT,
    IN p_day DATE,
    OUT msg VARCHAR(255)
)
BEGIN
    INSERT INTO Reserves(S_Id, B_Id, Day)
    VALUES(p_sailor_id, p_boat_id, p_day);
    SET msg = 'Reserve added successfully';
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE DeleteReserves(
    IN p_sailor_id INT,
    IN p_boat_id INT,
    IN p_day DATE,    -- Added parameter for Day
    OUT msg VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Reserves 
                  WHERE S_Id = p_sailor_id 
                  AND B_Id = p_boat_id 
                  AND Day = p_day) THEN
        SET msg = 'Error: Reservation not found';
    ELSE
        DELETE FROM Reserves 
        WHERE S_Id = p_sailor_id 
        AND B_Id = p_boat_id
        AND Day = p_day;
        SET msg = 'Reserve deleted successfully';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetReserves(OUT msg VARCHAR(255))
BEGIN
    IF (SELECT COUNT(*) FROM Reserves) = 0 THEN
        SET msg = 'Reserves Table is empty';
    ELSE
        SELECT 
            r.S_Id,
            s.Name AS Sailor_Name,
            r.B_Id,
            b.Name AS Boat_Name,
            r.Day
        FROM Reserves r
        JOIN Sailor s ON r.S_Id = s.S_Id
        JOIN Boat b ON r.B_Id = b.B_Id;
        SET msg = 'Reserves retrieved successfully.';
    END IF;
END$$

DELIMITER ;


