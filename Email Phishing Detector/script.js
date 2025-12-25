function checkEmail() {
  const email = document.getElementById("emailText").value.toLowerCase();
  const result = document.getElementById("result");

  if (!email) {
    result.innerText = "Please paste email content";
    return;
  }

  let score = 0;

  const phishingWords = [
    "verify",
    "urgent",
    "click here",
    "login",
    "account suspended",
    "password",
    "confirm"
  ];

  phishingWords.forEach(word => {
    if (email.includes(word)) score++;
  });

  if (email.includes("http://")) score++;
  if (email.includes("@")) score++;

  if (score >= 3) {
    result.innerText = "⚠️ Phishing Email Detected!";
    result.style.color = "red";
  } else {
    result.innerText = "✅ Email Looks Safe";
    result.style.color = "#00ffcc";
  }
}
