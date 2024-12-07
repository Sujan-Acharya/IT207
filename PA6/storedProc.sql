                                                                       -- Stored Procedures for sailor.js

DELIMITER //

CREATE PROCEDURE AddSailor(IN name VARCHAR(25), IN dob DATE, IN rate INT, OUT msg VARCHAR(250))
BEGIN
    DECLARE status VARCHAR(50) DEFAULT " ";

    -- Try to insert the new sailor
    INSERT INTO Sailor (S_name, B_date, Rate) VALUES (name, dob, rate);

    -- Set the status message
    SET status = "Sailor is added";

    -- Assign the status to the output variable
    SET msg = status;
END;
//

DELIMITER ;



DELIMITER $$
CREATE PROCEDURE SAILDB.GetSailor(OUT msg VARCHAR(255))
BEGIN
  -- Check if the sailor table is empty
  IF (SELECT COUNT(*) FROM sailor) = 0 THEN
    SET msg = "Sailor Table is empty";
  ELSE
    -- Retrieve all sailors
    SELECT * FROM sailor;
    SET msg = "All sailors retrieved successfully.";
  END IF;
END$$
DELIMITER ;

DELIMITER //

CREATE PROCEDURE SAILDB.UpdateSailor(
    IN p_S_Id INT,
    IN p_S_name VARCHAR(255),
    IN p_Rate INT,
    IN p_B_date DATE
)
BEGIN
    UPDATE Sailor 
    SET S_name = p_S_name, 
        Rate = p_Rate, 
        B_date = p_B_date
    WHERE S_Id = p_S_Id;

    IF ROW_COUNT() = 0 THEN
        SELECT 'No sailor found with this ID' AS message;
    ELSE
        SELECT 'Sailor updated successfully' AS message;
    END IF;
END //

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
    
    -- Check if sailor exists
    SELECT COUNT(*) INTO sailor_exists 
    FROM Sailor 
    WHERE S_id = sailor_id;
    
    IF sailor_exists = 0 THEN
        SET status = CONCAT('No sailor found with ID: ', sailor_id);
    ELSE
        -- Update the sailor's information
        -- Only update fields that are not NULL
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
    
    -- Set the output message
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
    
    -- Check if sailor exists
    SELECT COUNT(*) INTO sailor_exists 
    FROM Sailor 
    WHERE S_id = sailor_id;
    
    IF sailor_exists = 0 THEN
        SET status = CONCAT('No sailor found with ID: ', sailor_id);
    ELSE
        -- Delete the sailor
        DELETE FROM Sailor 
        WHERE S_id = sailor_id;
        
        SET status = CONCAT('Sailor with ID: ', sailor_id, ' deleted successfully');
    END IF;
    
    -- Set the output message
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

    -- Try to insert the new boat
    INSERT INTO Boat (B_name, B_type) VALUES (name, type);

    -- Set the status message
    SET status = 'Boat is added';

    -- Assign the status to the output variable
    SET msg = status;
END;
//

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetBoat(OUT msg VARCHAR(255))
BEGIN
    -- Check if the boat table is empty
    IF (SELECT COUNT(*) FROM boat) = 0 THEN
        SET msg = 'Boat Table is empty';
    ELSE
        -- Retrieve all boats
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
    
    -- Check if boat exists
    SELECT COUNT(*) INTO boat_exists 
    FROM Boat 
    WHERE B_Id = p_B_Id;
    
    IF boat_exists = 0 THEN
        SET status = CONCAT('No boat found with ID: ', p_B_Id);
    ELSE
        -- Update the boat's information
        -- Only update fields that are not NULL
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
    
    -- Set the output message
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
    
    -- Check if boat exists
    SELECT COUNT(*) INTO boat_exists 
    FROM Boat 
    WHERE B_Id = boat_id;
    
    IF boat_exists = 0 THEN
        SET status = CONCAT('No boat found with ID: ', boat_id);
    ELSE
        -- Delete the boat
        DELETE FROM Boat 
        WHERE B_Id = boat_id;
        
        SET status = CONCAT('Boat with ID: ', boat_id, ' deleted successfully');
    END IF;
    
    -- Set the output message
    SET msg = status;
END //

DELIMITER ;


                                                                     -- Stores Procedure for reserve.js --



