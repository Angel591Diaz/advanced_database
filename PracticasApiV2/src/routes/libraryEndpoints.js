const express = require("express");
const router = express.Router();
const { connection } = require("../config.db");

const sendDbError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Error de base de datos", details: err.message });
};

const ok = (res, data, code = 200) => res.status(code).json(data);
const created = (res, data) => res.status(201).json(data);

router.get('/books', (req, res) => {
    const query = `
        SELECT b.bookID, b.title, b.isbn, b.publicationYear, p.publisherName, l.languageName
        FROM Books b
        JOIN Publishers p ON b.publisherID = p.publisherID
        JOIN Languages l ON b.languageID = l.languageID;
    `;
    connection.query(query, (err, results) => {
        if (err) return sendDbError(res, err);
        ok(res, results);
    });
});

router.post('/users', (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const passwordHash = `hashed_${password}`; 

    const query = 'CALL sp_RegisterNewUser(?, ?, ?, ?, @p_userID, @p_message); SELECT @p_userID as userID, @p_message as message;';
    connection.query(query, [username, passwordHash, firstName, lastName], (err, results) => {
        if (err) return sendDbError(res, err);
        const output = results[1][0];
        if (output.userID === -1) {
            return res.status(409).json({ error: output.message }); 
        }
        created(res, { userID: output.userID, message: output.message });
    });
});

router.post('/loans', (req, res) => {
    const { copyID, userID } = req.body;

    if (!copyID || !userID) {
        return res.status(400).json({ error: "copyID y userID son requeridos." });
    }

    const query = 'CALL sp_PerformLoan(?, ?, @p_loanID, @p_message); SELECT @p_loanID as loanID, @p_message as message;';
    connection.query(query, [copyID, userID], (err, results) => {
        if (err) return sendDbError(res, err);
        const output = results[1][0];
        if (output.loanID === -1) {
            return res.status(400).json({ error: output.message });
        }
        created(res, { loanID: output.loanID, message: output.message });
    });
});

router.put('/loans/:id/return', (req, res) => {
    const loanID = Number(req.params.id);

    if (!Number.isInteger(loanID)) {
        return res.status(400).json({ error: "ID de préstamo inválido." });
    }

    const query = 'CALL sp_RegisterReturn(?, @p_message); SELECT @p_message as message;';
    connection.query(query, [loanID], (err, results) => {
        if (err) return sendDbError(res, err);
        const output = results[1][0];
        if (output.message.startsWith('Error:')) {
            return res.status(400).json({ error: output.message });
        }
        ok(res, { message: output.message });
    });
});


module.exports = router;