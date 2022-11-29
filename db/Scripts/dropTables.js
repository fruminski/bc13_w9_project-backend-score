import { dropApisTable } from "../helpers.js";
import { pool } from "../index.js";

try {
  await dropApisTable();
  console.log("Drop 'Apis' table");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}