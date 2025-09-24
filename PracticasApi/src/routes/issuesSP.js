const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const { connection } = require("../config.db");

/* ============================
   Helpers
============================ */
const sendDbError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Database error", details: err.code || err.message });
};

const ok = (res, data, code = 200) => res.status(code).json(data);

/* ============================
   ISSUES — Stored Procedures
============================ */

/** GET /issues/get/count
 *  -> CALL countIssues()
 */
const countIssuesSP = (req, res) => {
  connection.query("CALL countIssues()", (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, results[0]);
  });
};

/** PATCH /issues/patch/:id
 *  body: { state: boolean }
 *  -> CALL updateStateIssues(p_IssueId, p_State)
 */
const updateStateIssuesSP = (req, res) => {
  const id = Number(req.params.id);
  const { state } = req.body;

  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
  if (typeof state !== "boolean") return res.status(400).json({ error: "state must be boolean" });

  connection.query("CALL updateStateIssues(?, ?)", [id, state], (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, { message: "Estado actualizado", affectedRows: results?.affectedRows ?? undefined });
  });
};

/** GET /issues/get/recent/:date
 *  :date en formato 'YYYY-MM-DD' o 'YYYY-MM-DD HH:mm:ss'
 *  -> CALL recentsIssues(p_Since)
 */
const recentsIssuesSP = (req, res) => {
  const { since } = req.body;
  if (!since) return res.status(400).json({ error: "date param is required" });

  connection.query("CALL recentsIssues(?)", [since], (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, results[0]);
  });
};

/** PUT /issues/put/update/:id
 *  body: { content: string }
 *  -> CALL updateIssueContent(p_IssueId, p_Content)
 */
const updateIssueContentSP = (req, res) => {
  const id = Number(req.params.id);
  const { content } = req.body;

  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
  if (typeof content !== "string" || content.trim() === "")
    return res.status(400).json({ error: "content must be a non-empty string" });

  connection.query("CALL updateIssueContent(?, ?)", [id, content], (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, { message: "Contenido actualizado", affectedRows: results?.affectedRows ?? undefined });
  });
};

/** GET /issues/get/count/nulls
 *  -> CALL countIssuesWithoutContent()
 */
const countIssuesWithoutContentSP = (req, res) => {
  connection.query("CALL countIssuesWithoutContent()", (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, results[0][0]); // retorna un solo registro { incidencias_sin_contenido: n }
  });
};

/** GET /issues/get/count/longest
 *  -> CALL longestContentIssue()
 */
const longestContentIssueSP = (req, res) => {
  connection.query("CALL longestContentIssue()", (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, results[0][0] || null);
  });
};

/** DELETE /issues/delete
 *  -> CALL deleteInactiveIssues()
 */
const deleteInactiveIssuesSP = (req, res) => {
  connection.query("CALL deleteInactiveIssues()", (err, results) => {
    if (err) return sendDbError(res, err);
    // Nota: con mysql2, el número de filas borradas a veces viene en results.affectedRows o en el paquete OkPacket
    const okPacket = Array.isArray(results) ? results[0] : results;
    ok(res, { message: "Incidencias inactivas eliminadas", result: okPacket });
  });
};

/** PATCH /issues/patch/olds
 *  body: { days: number }
 *  -> CALL deactivateOldIssues(p_Days)
 */
const deactivateOldIssuesSP = (req, res) => {
  const { days } = req.body;
  if (!Number.isInteger(days) || days < 0)
    return res.status(400).json({ error: "days must be a non-negative integer" });

  connection.query("CALL deactivateOldIssues(?)", [days], (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, { message: `Incidencias > ${days} días marcadas como inactivas` });
  });
};

/** GET /issues/get/listalls
 *  -> CALL listAllIssues()
 */
const listAllIssuesSP = (req, res) => {
  connection.query("CALL listAllIssues()", (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, results[0]);
  });
};

/** GET /issues/get/search/:text
 *  -> CALL searchIssuesByText(p_Text)
 */
const searchIssuesByTextSP = (req, res) => {
  const { content } = req.body;
  connection.query("CALL searchIssuesByText(?)", [content], (err, results) => {
    if (err) return sendDbError(res, err);
    ok(res, results[0]);
  });
};

/* ============================
   Rutas
============================ */
// Mantengo las rutas como pediste, conectándolas a los handlers:
app.route("/issues/count").get(countIssuesSP);
app.route("/issues/:id").patch(updateStateIssuesSP);
app.route("/issues/recent").get(recentsIssuesSP);
app.route("/issues/update/:id").put(updateIssueContentSP);
app.route("/issues/count/nulls").get(countIssuesWithoutContentSP);
app.route("/issues/count/longest").get(longestContentIssueSP);
app.route("/issues/delete").delete(deleteInactiveIssuesSP);
app.route("/issues/olds").put(deactivateOldIssuesSP);
app.route("/issues/listalls").get(listAllIssuesSP);
app.route("/issues/search").get(searchIssuesByTextSP);

module.exports = app;
