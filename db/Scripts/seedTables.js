import { seedApisTables } from "../helpers.js";
import { pool } from "../index.js";

try {
  await seedApisTables();
  console.log("Seed 'Apis' table");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}