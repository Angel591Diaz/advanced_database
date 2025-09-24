USE issues;

DROP FUNCTION IF EXISTS fn_Count_Type_Issues;
DELIMITER $$
CREATE FUNCTION fn_Count_Type_Issues(p_type_issues_name VARCHAR(100))
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_Count INT DEFAULT 0;
    SELECT COUNT(*)
    INTO v_Count
    FROM issues as i
    JOIN type_issues as t
    	ON i.fkiCod_Type_Issues = t.iCod_Type_Issue
    -- CORRECCIÓN: Se añade COLLATE para forzar una comparación de texto consistente y evitar el error.
    WHERE LOWER(t.s_Name_Type_Issue) = LOWER(p_type_issues_name COLLATE utf8mb4_unicode_ci) AND b_State_Issues = TRUE;

    RETURN v_Count;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_last_issue_date_by_user;
DELIMITER $$
CREATE FUNCTION fn_last_issue_date_by_user(p_user_id INT)
RETURNS DATETIME
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_Last DATETIME;
	SELECT MAX(dt_Created_Causing_Users)
		INTO v_Last
		FROM causing_users
		WHERE fkiCod_Users = p_user_id;

	RETURN v_Last;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_count_issues_actives;
DELIMITER $$
CREATE FUNCTION fn_count_issues_actives()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_Count INT DEFAULT 0;
	SELECT COUNT(*)
		INTO v_Count
		FROM issues
	-- CORRECCIÓN: Se añade COLLATE para evitar errores de comparación de texto.
	WHERE e_State_Review COLLATE utf8mb4_unicode_ci IN ('Open', 'InProgress');

	RETURN v_Count;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_avg_issue_severity;
DELIMITER $$
CREATE FUNCTION fn_avg_issue_severity()
RETURNS DECIMAL(5,2)
NOT DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_avg DECIMAL(10,4);

    SELECT AVG(
             -- CORRECCIÓN: Se añade COLLATE para evitar errores de comparación de texto.
             CASE LOWER(s.s_Name_Severity COLLATE utf8mb4_unicode_ci)
               WHEN 'low'    THEN 1
               WHEN 'medium' THEN 2
               WHEN 'high'   THEN 3
               WHEN 'critical' THEN 4
               ELSE NULL
             END
           )
      INTO v_avg
      FROM issues AS i
      JOIN severity AS s
      	ON i.fkiCod_Severity = s.iCod_Severity
      WHERE i.b_State_Issues = TRUE;

    RETURN ROUND(v_avg, 2);
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_most_recent_issue_id;
DELIMITER $$
CREATE FUNCTION fn_most_recent_issue_id()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_Count INT;
	SELECT iCod_Issues
		INTO v_Count
		FROM issues
		ORDER BY dt_Created_Issues DESC
		LIMIT 1;
	RETURN v_Count;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_oldest_issues;
DELIMITER $$
CREATE FUNCTION fn_oldest_issues()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_Count INT;
	SELECT iCod_Issues
		INTO v_Count
		FROM issues
		ORDER BY dt_Created_Issues ASC
		LIMIT 1;
	RETURN v_Count;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_users_max_issues_registers;
DELIMITER $$
CREATE FUNCTION fn_users_max_issues_registers()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_Count INT DEFAULT 0;
	SELECT i.fkiCod_User_Register
		INTO v_Count
		FROM issues i
		GROUP BY i.fkiCod_User_Register
		ORDER BY COUNT(*) DESC,
		i.fkiCod_User_Register ASC
		LIMIT 1;
	RETURN v_Count;

END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_avg_description_length;
DELIMITER $$
CREATE FUNCTION fn_avg_description_length()
RETURNS DECIMAL(10,2)
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_avg DECIMAL(18,6);
	SELECT AVG(CHAR_LENGTH(i.s_Issue_Description))
     	INTO v_avg
     	FROM issues AS i
     WHERE
     	i.s_Issue_Description IS NOT NULL
      	AND i.b_State_Issues = TRUE;
    RETURN ROUND(v_avg, 2);
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_issues_with_null_description;
DELIMITER $$
CREATE FUNCTION fn_issues_with_null_description()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_Count INT DEFAULT 0;
	SELECT COUNT(*)
		INTO v_Count
		FROM issues
		-- CORRECCIÓN: Se busca tanto valores NULOS como cadenas vacías para ser más preciso.
		WHERE s_Issue_Description IS NULL OR s_Issue_Description = '';
	RETURN v_Count;
END $$
DELIMITER ;

DROP FUNCTION IF EXISTS fn_max_description_length;
DELIMITER $$
CREATE FUNCTION fn_max_description_length()
RETURNS INT
NOT DETERMINISTIC
READS SQL DATA
BEGIN
	DECLARE v_issue_id INT DEFAULT 0;
	SELECT i.iCod_Issues
    	INTO v_issue_id
    	FROM issues AS i
    WHERE i.s_Issue_Description IS NOT NULL
    	AND i.b_State_Issues = TRUE
    ORDER BY CHAR_LENGTH(i.s_Issue_Description) DESC
    LIMIT 1;
    RETURN v_issue_id;
END $$
DELIMITER ;