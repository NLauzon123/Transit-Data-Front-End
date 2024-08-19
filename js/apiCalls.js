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
      // return the data
      return JSON.stringify(data);
    } else {
      // Handle errors (e.g., non-200 status codes)
      return { error: `Error: ${response.statusText}` };
    }
  } catch (error) {
    // Handle network errors or other issues
    document.getElementById("result").innerText = `Error: ${error.message}`;
  }
};

export { getDataFromProcedure };
