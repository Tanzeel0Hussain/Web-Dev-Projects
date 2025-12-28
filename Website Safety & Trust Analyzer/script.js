async function analyzeURL() {
  const url = document.getElementById("urlInput").value.toLowerCase();
  const result = document.getElementById("result");
  const reasonsList = document.getElementById("reasons");

  reasonsList.innerHTML = "";
  let riskScore = 0;

  if (!url) {
    result.innerText = "Please enter a website URL";
    return;
  }

  // HTTPS check
  if (!url.startsWith("https://")) {
    addReason("Website is not using HTTPS (Not Encrypted)");
    riskScore++;
  }

  // Long URL
  if (url.length > 75) {
    addReason("URL is unusually long");
    riskScore++;
  }

  // IP based URL
  if (url.match(/\d+\.\d+\.\d+\.\d+/)) {
    addReason("Website uses IP address instead of domain");
    riskScore++;
  }

  // Phishing keywords
  const keywords = ["login", "verify", "secure", "update", "account"];
  keywords.forEach(word => {
    if (url.includes(word)) {
      addReason(`Suspicious keyword found: "${word}"`);
      riskScore++;
    }
  });

  // Free domains
  const freeDomains = [".tk", ".ml", ".ga"];
  freeDomains.forEach(d => {
    if (url.endsWith(d)) {
      addReason("Free domain detected (commonly abused)");
      riskScore++;
    }
  });

  // Blacklist check
  const data = await fetch("blacklist.json").then(res => res.json());
  data.unsafe.forEach(site => {
    if (url.includes(site)) {
      addReason("Website found in unsafe blacklist");
      riskScore += 2;
    }
  });

  // Final Result
  if (riskScore >= 4) {
    result.innerText = "This website is NOT SAFE";
    result.style.color = "red";
  } else {
    result.innerText = "This website appears SAFE";
    result.style.color = "green";
  }
}

function addReason(text) {
  const li = document.createElement("li");
  li.innerText = text;
  document.getElementById("reasons").appendChild(li);
}
