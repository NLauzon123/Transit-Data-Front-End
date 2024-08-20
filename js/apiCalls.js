const getDataFromProcedure = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/getDataFromProcedure`,
      {
        method: "POST",
        credentials: "include",
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
      return data;
    } else {
      // Handle errors (e.g., non-200 status codes)
      return { error: `Error: ${response.statusText}` };
    }
  } catch (error) {
    // Handle network errors or other issues
    console.log(`Error: ${error.message}`);
  }
};

const loginUser = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/loginUser`,
      {
        method: "POST",
        credentials: "include",
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
      return data;
    } else {
      // Handle errors (e.g., non-200 status codes)
      return { error: `Error: ${response.statusText}` };
    }
  } catch (error) {
    // Handle network errors or other issues
    console.log(`Error: ${error.message}`);
  }
};

const checkToken = async () => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/checkToken`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is OK (status code 200)
    if (response.ok) {
      // Parse the JSON data from the response
      const data = await response.json();
      // return the data
      return data;
    } else {
      // Handle errors (e.g., non-200 status codes)
      return { error: `Error: ${response.statusText}` };
    }
  } catch (error) {
    // Handle network errors or other issues
    console.log(`Error: ${error.message}`);
  }
};

export { getDataFromProcedure, loginUser, checkToken };
