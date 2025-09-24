const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const { connection } = require("../config.db");

const sendDbError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: "Database error", details: err.code || err.message });
};

const ok = (res, data, code = 200) => res.status(code).json(data);

// Endpoint: GET /issues/count/type
const countTypeIssuesFN = (req, res) => {
  const { type_issues_name } = req.params;
  const sqlQuery = "SELECT fn_Count_Type_Issues(?) AS count";

  connection.query(sqlQuery, [type_issues_name], (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { count: 0 });
    }
    ok(res, { count: results[0].count });
  });
};

// Endpoint: GET /issues/lastdate/:user_id
const lastIssueDateByUserFN = (req, res) => {
  const { user_id } = req.params;
  const sqlQuery = "SELECT fn_last_issue_date_by_user(?) AS last_issue_date";

  connection.query(sqlQuery, [user_id], (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { last_issue_date: null });
    }
    ok(res, { last_issue_date: results[0].last_issue_date });
  });
};

// Endpoint: GET /issues/count/active
const countActiveIssuesFN = (req, res) => {
  const sqlQuery = "SELECT fn_count_issues_actives() AS count";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { count: 0 });
    }
    ok(res, { count: results[0].count });
  });
};

// Endpoint: GET /issues/avg/severity
const avgIssueSeverityFN = (req, res) => {
  const sqlQuery = "SELECT fn_avg_issue_severity() AS average_severity";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { average_severity: 0 });
    }
    ok(res, { average_severity: results[0].average_severity });
  });
};

// Endpoint: GET /issues/mostrecent
const mostRecentIssueFN = (req, res) => {
  const sqlQuery = "SELECT fn_most_recent_issue_id() AS most_recent_issue_id";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { most_recent_issue_id: null });
    }
    ok(res, { most_recent_issue_id: results[0].most_recent_issue_id });
  });
};

// Endpoint: GET /issues/oldest
const oldestIssueFN = (req, res) => {
  const sqlQuery = "SELECT fn_oldest_issues() AS oldest_issue_id";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { oldest_issue_id: null });
    }
    ok(res, { oldest_issue_id: results[0].oldest_issue_id });
  });
};

// Endpoint: GET /issues/user/most
const userWithMostIssuesFN = (req, res) => {
  const sqlQuery = "SELECT fn_users_max_issues_registers() AS user_with_most_issues";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { user_with_most_issues: null });
    }
    ok(res, { user_with_most_issues: results[0].user_with_most_issues });
  });
};

// Endpoint: GET /issues/avg/description
const avgDescriptionLengthFN = (req, res) => {
  const sqlQuery = "SELECT fn_avg_description_length() AS avg_description_length";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { avg_description_length: 0 });
    }
    ok(res, { avg_description_length: results[0].avg_description_length });
  });
};

// Endpoint: GET /issues/count/nodescription
const countIssuesWithoutDescriptionFN = (req, res) => {
  const sqlQuery = "SELECT fn_issues_with_null_description() AS count_without_description";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { count_without_description: 0 });
    }
    ok(res, { count_without_description: results[0].count_without_description });
  });
};

// Endpoint: GET /issues/maxdescription
const maxDescriptionLengthFN = (req, res) => {
  const sqlQuery = "SELECT fn_max_description_length() AS max_description_issue_id";

  connection.query(sqlQuery, (err, results) => {
    if (err) return sendDbError(res, err);

    if (!results || results.length === 0) {
      return ok(res, { max_description_issue_id: null });
    }
    ok(res, { max_description_issue_id: results[0].max_description_issue_id });
  });
};

app.route("/issues/count/type/:type_issues_name").get(countTypeIssuesFN);
app.route("/issues/lastdate/:user_id").get(lastIssueDateByUserFN);
app.route("/issues/count/active").get(countActiveIssuesFN);
app.route("/issues/avg/severity").get(avgIssueSeverityFN);
app.route("/issues/mostrecent").get(mostRecentIssueFN);
app.route("/issues/oldest").get(oldestIssueFN);
app.route("/issues/user/most").get(userWithMostIssuesFN);
app.route("/issues/avg/description").get(avgDescriptionLengthFN);
app.route("/issues/count/nodescription").get(countIssuesWithoutDescriptionFN);
app.route("/issues/maxdescription").get(maxDescriptionLengthFN);

module.exports = app;