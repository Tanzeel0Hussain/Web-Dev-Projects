function checkEmail() {
  const email = document.getElementById("emailText").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (!email) {
    result.innerText = "Please paste email content";
    result.style.color = "orange";
    return;
  }

  let score = 0;

  const urgencyWords = ["urgent", "immediately", "act now", "account suspended", "final warning"];
  const credentialWords = ["verify", "login", "password", "confirm", "security check", "update account"];

  urgencyWords.forEach(word => {
    if (email.includes(word)) score++;
  });

  credentialWords.forEach(word => {
    if (email.includes(word)) score++;
  });

  const links = email.match(/https?:\/\/[^\s]+/g) || [];
  if (links.some(link => link.startsWith("http://"))) score += 2;
  if (links.length >= 2) score++;

  const shorteners = ["bit.ly", "tinyurl.com", "t.co", "cutt.ly", "is.gd"];
  if (links.some(link => shorteners.some(domain => link.includes(domain)))) score += 2;

  if (score >= 3) {
    result.innerText = "⚠️ Potential phishing signs detected";
    result.style.color = "red";
  } else {
    result.innerText = "✅ No obvious phishing signs found";
    result.style.color = "#00ffcc";
  }
}
