const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_TRUST_CERTIFICATE === "true", // Logically check for string 'true'
    trustServerCertificate: process.env.DB_ENCRYPT === "true", // Logically check for string 'true'
  },
};

console.log("DB Config:", config); // Log the DB configuration

const queries = {
  top10fare: `SELECT TOP (10) [fareID]
      ,[fareUserID]
      ,[fareType]
      ,[startDate]
      ,[endDate]
      ,[quantityRemaining]
  FROM [Transit].[dbo].[Fare]`,
};

exports.handler = async function (event, context) {
  const queryName = event.queryStringParameters.queryName;
  const query = queries[queryName];

  console.log("Received query:", queryName);
  console.log("SQL Query:", query);

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Query "${queryName}" not found.` }),
    };
  }
  return {
    statusCode: 500,
  };
  // try {
  //   console.log("Attempting to connect to the database...");
  //   let pool = await sql.connect(config);
  //   console.log("Connected to the database successfully.");

  //   let result = await pool.request().query(query);

  //   console.log("Query executed successfully:", result);
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(result.recordsets),
  //   };
  // } catch (err) {
  //   console.error("SQL error", err);
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ error: "Server Error", details: err.message }),
  //   };
  // }
};
