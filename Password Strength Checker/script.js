function checkStrength() {
  const password = document.getElementById("password").value;
  let strengthText = document.getElementById("strength");

  const length = document.getElementById("length");
  const upper = document.getElementById("upper");
  const lower = document.getElementById("lower");
  const number = document.getElementById("number");
  const special = document.getElementById("special");

  let score = 0;

  if (password.length >= 8) { length.classList.add("valid"); score++; }
  else length.classList.remove("valid");

  if (/[A-Z]/.test(password)) { upper.classList.add("valid"); score++; }
  else upper.classList.remove("valid");

  if (/[a-z]/.test(password)) { lower.classList.add("valid"); score++; }
  else lower.classList.remove("valid");

  if (/[0-9]/.test(password)) { number.classList.add("valid"); score++; }
  else number.classList.remove("valid");

  if (/[^A-Za-z0-9]/.test(password)) { special.classList.add("valid"); score++; }
  else special.classList.remove("valid");

  if (score <= 2) strengthText.innerText = "Weak Password";
  else if (score <= 4) strengthText.innerText = "Medium Password";
  else strengthText.innerText = "Strong Password";
}
