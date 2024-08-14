const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_TRUST_CERTIFICATE === true,
    trustServerCertificate: process.env.DB_ENCRYPT === true,
  },
};

const queries = {};

exports.handler = async function (event, context) {
  // const queryName = event.queryStringParameters.queryName;
  // const query = queries[queryName];

  // if (!query) {
  //   // If queryName is not found in the queries object, throw an error
  //   return {
  //     statusCode: 400, // Bad Request
  //     body: JSON.stringify({ error: `Query "${queryName}" not found.` }),
  //   };
  // }
  try {
    let pool = await sql.connect(config);

    // Execute the SQL query
    let result = await pool
      .request()
      .input("year", sql.Int, 2024)
      .input("service", sql.Int, 35)
      .execute("MidTermTraffic");

    // Return the result to the client
    return {
      statusCode: 200,
      body: JSON.stringify(result.recordsets), // Include the query result in the response body
    };
  } catch (err) {
    console.error("SQL error", err);
    return { statusCode: 500, body: "Server Error" };
  }
};
