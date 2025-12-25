function checkURL() {
  const url = document.getElementById("urlInput").value.toLowerCase();
  const result = document.getElementById("result");

  if (!url) {
    result.innerText = "Please enter a URL";
    return;
  }

  let phishingScore = 0;

  if (url.includes("@")) phishingScore++;
  if (url.length > 75) phishingScore++;
  if (url.includes("http://")) phishingScore++;
  if (url.match(/\d+\.\d+\.\d+\.\d+/)) phishingScore++;
  if (url.includes("-")) phishingScore++;
  if (url.includes("login") || url.includes("verify") || url.includes("secure"))
    phishingScore++;

  if (phishingScore >= 3) {
    result.innerText = "⚠️ Phishing URL Detected!";
    result.style.color = "red";
  } else {
    result.innerText = "✅ URL Looks Safe";
    result.style.color = "#00ffcc";
  }
}
