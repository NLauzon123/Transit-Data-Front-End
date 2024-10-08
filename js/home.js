import { getUserDataFromToken, setupHeader } from "./pageSetup.js";
import { loginUser } from "./apiCalls.js";

await getUserDataFromToken(false);

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("inputUsername").value;
  const password = document.getElementById("inputPassword").value;
  await login(username, password);
});

async function login(username, password) {
  const result = await loginUser({ username, password });
  if (result && result.status == 200) {
    redirectToDashboard();
  } else {
    alert("Unable to login.");
  }
}

function redirectToDashboard() {
  window.location.href = "dashboard.html";
}
