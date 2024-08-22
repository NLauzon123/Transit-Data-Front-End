import { checkToken, logoutUser } from "./apiCalls.js";

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

function setupHeader(userData) {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn)
    logoutBtn.addEventListener("click", async () => {
      const result = await logoutUser();
      if (result && result.status == 200) window.location.replace("/");
      else {
        alert("Error logging out.");
      }
    });
  console.log(userData.shortName.toLowerCase());
  displayUserData(userData);
}

function displayUserData(userData) {
  const { firstName, lastName, shortName } = userData;
  const displayArea = document.getElementById("header-welcome");
  const agencyImg = document.createElement("img");
  agencyImg.src = `./resources/${shortName.toLowerCase()}-logo.png`;
  agencyImg.classList.add("header__agency-img");
  const welcomeMessage = document.createElement("span");
  welcomeMessage.innerText = `Welcome ${firstName} ${lastName}`;
  welcomeMessage.classList.add("header__welcome-message");
  displayArea.append(agencyImg);
  displayArea.append(welcomeMessage);
}

export { getUserDataFromToken, setupHeader };
