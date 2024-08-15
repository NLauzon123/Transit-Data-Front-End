const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: process.env.DB_TRUST_CERTIFICATE === "true", // Logically check for string 'true'
    trustServerCertificate: process.env.DB_ENCRYPT === "true", // Logically check for string 'true'
  },
};

const allowedProcedures = ["MidTermTraffic", "AnotherProcedure"];

exports.handler = async function (event, context) {
  // Parse the request body
  const requestData = JSON.parse(event.body);

  // Check if the procedure is allowed
  if (!allowedProcedures.includes(requestData.procedure)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid procedure name." }),
    };
  }

  // Validate the params before proceeding
  const isValid = requestData.params.every((param) => {
    return (
      typeof param.key === "string" &&
      typeof param.value !== "undefined" &&
      sql[param.type] // Ensure the type is valid in mssql
    );
  });

  if (!isValid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid parameters." }),
    };
  }

  try {
    console.log("Attempting to connect to the database...");
    let pool = await sql.connect(config);
    console.log("Connected to the database successfully.");

    let request = pool.request();
    let result = await getResult(requestData, request);

    console.log("Query executed successfully:", result);
    return {
      statusCode: 200,
      body: JSON.stringify(result.recordsets),
    };
  } catch (err) {
    console.error("SQL error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error" }),
    };
  }

  async function getResult(requestData, request) {
    let { procedure, params } = requestData;
    params.forEach((param) => {
      let { key, type, value } = param;
      request.input(key, sql[type], value);
    });
    return await request.execute(procedure);
  }
};
