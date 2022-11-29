import { createApisTable } from "../helpers.js";
import { pool } from "../index.js";

try {
  await createApisTable();
  console.log("Created 'Apis' table");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}