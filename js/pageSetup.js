import { checkToken } from "./apiCalls.js";

async function getUserDataFromToken(shouldBeLoggedIn) {
  const checkTokenResult = await checkToken();
  if (
    shouldBeLoggedIn &&
    (!checkTokenResult || checkTokenResult.status != 200)
  ) {
    window.location.replace("/");
  } else if (
    !shouldBeLoggedIn &&
    checkTokenResult &&
    checkTokenResult.status == 200
  ) {
    window.location.replace("dashboard.html");
  } else if (checkTokenResult && checkTokenResult.status == 200) {
    return checkTokenResult.recordset;
  } else {
    return "Error authenticating login";
  }
}

export { getUserDataFromToken };
