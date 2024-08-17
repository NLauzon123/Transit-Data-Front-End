const getDataFromProcedure = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/getDataFromProcedure`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    // Check if the response is OK (status code 200)
    if (response.ok) {
      // Parse the JSON data from the response
      const data = await response.json();

      // Display the data in the #result div
      document.getElementById("result").innerText = JSON.stringify(
        data,
        null,
        2
      );
    } else {
      // Handle errors (e.g., non-200 status codes)
      document.getElementById(
        "result"
      ).innerText = `Error: ${response.statusText}`;
    }
  } catch (error) {
    // Handle network errors or other issues
    document.getElementById("result").innerText = `Error: ${error.message}`;
  }
};

export { getDataFromProcedure };
