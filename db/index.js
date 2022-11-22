const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES,
});

module.exports = {
  query: function (text, params) {
    return pool.query(text, params);
  },
};
