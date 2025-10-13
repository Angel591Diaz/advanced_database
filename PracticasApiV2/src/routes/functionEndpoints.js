const express = require("express");
const router = express.Router();
const { connection } = require("../config.db");

const sendDbError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Error de base de datos", details: err.message });
};

const ok = (res, data) => res.status(200).json(data);

router.get('/stats/user-loans/:id', (req, res) => {
    const userID = Number(req.params.id);
    if (!Number.isInteger(userID)) {
        return res.status(400).json({ error: "ID de usuario inválido." });
    }
    
    connection.query('SELECT fn_GetUserLoanCount(?) AS loanCount', [userID], (err, results) => {
        if (err) return sendDbError(res, err);
        ok(res, results[0]);
    });
});

router.get('/stats/copy-available/:id', (req, res) => {
    const copyID = Number(req.params.id);
    if (!Number.isInteger(copyID)) {
        return res.status(400).json({ error: "ID de copia inválido." });
    }
    
    connection.query('SELECT fn_IsBookCopyAvailable(?) AS isAvailable', [copyID], (err, results) => {
        if (err) return sendDbError(res, err);
        results[0].isAvailable = !!results[0].isAvailable;
        ok(res, results[0]);
    });
});

router.get('/stats/active-loans', (req, res) => {
    connection.query('SELECT fn_GetActiveLoanCount() AS totalActiveLoans', (err, results) => {
        if (err) return sendDbError(res, err);
        ok(res, results[0]);
    });
});

module.exports = router;