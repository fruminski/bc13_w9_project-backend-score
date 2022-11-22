import PG from 'pg'
const Pool = PG.Pool;

const pool = new Pool({
  connectionString: process.env.POSTGRES,
});

export function query(text, params) {
  return pool.query(text, params);
}
