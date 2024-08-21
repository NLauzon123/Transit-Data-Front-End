const getDataFromProcedure = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/getdatafromprocedure`,
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

const signupUser = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/signupuser`,
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
      `https://transitvanierbackend.azurewebsites.net/api/loginuser`,
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

const logoutUser = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/logoutuser`,
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

const checkToken = async () => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/checktoken`,
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

const changePassword = async (requestData) => {
  try {
    // Make the request to the Netlify function
    const response = await fetch(
      `https://transitvanierbackend.azurewebsites.net/api/changepassword`,
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

export {
  getDataFromProcedure,
  signupUser,
  loginUser,
  logoutUser,
  checkToken,
  changePassword,
};
