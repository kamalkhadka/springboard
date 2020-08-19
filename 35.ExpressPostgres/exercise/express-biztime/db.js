/** Database setup for BizTime. */

const { Client } = require("pg");

let DB_URL = "postgresql:///biztime";
if (process.env.NODE_ENV === "test") DB_URL = "postgresql:///biztime_test";

const db = new Client({ connectionString: DB_URL });

db.connect();

module.exports = db;
