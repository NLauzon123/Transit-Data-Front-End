import { checkToken, loginUser } from "./apiCalls.js";

const checkTokenResult = await checkToken();

if (checkTokenResult && !checkTokenResult.error) {
  //   redirectToDashboard();
}

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("inputUsername").value;
  const password = document.getElementById("inputPassword").value;
  await login(username, password);
});

async function login(username, password) {
  const result = await loginUser({ username, password });
  if (result && !result.error) {
    redirectToDashboard();
  } else {
    alert("Unable to login.");
  }
}

function redirectToDashboard() {
  window.location.replace("dashboard.html");
}
