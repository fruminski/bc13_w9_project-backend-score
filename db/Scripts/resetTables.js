import { resetApisTable } from "../helpers.js";
import { pool } from "../index.js";

try {
  await resetApisTable();
  console.log("Reset 'Apis' table");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}