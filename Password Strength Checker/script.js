function checkStrength() {
  const password = document.getElementById("password").value;
  const strengthText = document.getElementById("strength");

  const length = document.getElementById("length");
  const upper = document.getElementById("upper");
  const lower = document.getElementById("lower");
  const number = document.getElementById("number");
  const special = document.getElementById("special");

  const rules = [
    { element: length, valid: password.length >= 8 },
    { element: upper, valid: /[A-Z]/.test(password) },
    { element: lower, valid: /[a-z]/.test(password) },
    { element: number, valid: /[0-9]/.test(password) },
    { element: special, valid: /[^A-Za-z0-9]/.test(password) }
  ];

  rules.forEach(rule => rule.element.classList.toggle("valid", rule.valid));

  if (!password) {
    strengthText.innerText = "Enter a password";
    return;
  }

  const score = rules.filter(rule => rule.valid).length;

  if (score <= 2) strengthText.innerText = "Weak Password";
  else if (score <= 4) strengthText.innerText = "Medium Password";
  else strengthText.innerText = "Strong Password";
}
