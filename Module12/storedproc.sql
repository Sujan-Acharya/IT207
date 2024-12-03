delimiter //
Create procedure If not exists AddChild(IN name VARCHAR(50), IN dob DATE, OUT msg VARCHAR(250))
  BEGIN
  DECLARE status VARCHAR(50) DEFAULT " ";
  DECLARE days INT;

        SET days = DATEDIFF(CURDATE(), dob);

        if ( (days/365 < 4) || (days/365 > 10)) THEN
            SET STATUS = " Child's age must be between 4 and 10 ";
        ELSE 
            INSERT INTO Child (ChildName, BirthDate) values (name, dob);
            SET STATUS = "Child is added";
        END IF;

        set msg = STATUS;
  END;
//
delimiter ;

delimiter //
Create procedure If not exists AddGroup(IN name VARCHAR(50), IN enroll INT, IN sdate DATE, OUT msg VARCHAR(250))
  BEGIN
  DECLARE status VARCHAR(50) DEFAULT " ";
  DECLARE  grp_date DATE;
  DECLARE numrows INT;

        SELECT count(*) into numrows from grp where upper(grpLevel) = upper(name) and startdate = sdate;

        if ( numrows > 0) THEN
            SET STATUS = "Group Exists ";
        ELSE 
            INSERT INTO Grp (grpLevel, enrollment, startdate) values (name, enroll, sdate);
            SET STATUS = " Group added";
        END IF;

        set msg = STATUS;
  END;
//
delimiter //
Create procedure If not exists AddRegistration(IN cID INT, IN grpID INT, OUT msg VARCHAR(250))
  BEGIN
  DECLARE status VARCHAR(50) DEFAULT " ";
  DECLARE  numdays, enroll_count INT;
  DECLARE grp_level VARCHAR(50);
  DECLARE error BOOL DEFAULT false;
  DECLARE bdate DATE;

        select birthdate into bdate from Child where ChildID = cID;
        set numdays = DATEDIFF(CURDATE(), bdate);
        select enrollment, grpLevel into enroll_count, grp_level from grp where grpNum = grpID;

        if ( upper(grp_Level) = 'ADVANCED') and (numdays/365 < 8) THEN
            SET STATUS = "Registration Failed - Child's age is below 8 Years";
            SET error = true;
        END IF;

        if ( upper(grp_Level) = 'BEGINER' and (enroll_count = 10) ) THEN
            set STATUS = CONCAT (status, " Maximum enrollment allowed in a Beginer level is 10; ");
            set error = true;
        END IF;

        if ( (upper(grp_Level) = 'ADVANCED' or upper(grp_Level) = 'INTERMEDIATE') and (enroll_count = 8) ) THEN
            SET STATUS = CONCAT (status, " Maximum enrollment allowed in a Advanced or Intermediate level is 8; ");
            set error = true;
        END IF;

        if (error = false) THEN
            INSERT INTO register (ChildID, GrpNUM) values ( cID, grpID);
            UPDATE grp set enrollment = enroll_count + 1 where grpNUM = grpID;
            SET STATUS = "Registration Successful";
        END IF;
        set msg = STATUS;
  END;
//

delimiter ;
