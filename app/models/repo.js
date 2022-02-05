const { Pool } = require("pg");
const config = require("../config");

const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

const query = async (query, params = null) => {
  let response;

  if (params) {
    response = await pool.query(query, params);
  } else {
    response = await pool.query(query);
  }

  return response;
};

const getClient = async () => {
  const response = await pool.connect();
  return response;
};

module.exports = {
  query,
  getClient,
};







