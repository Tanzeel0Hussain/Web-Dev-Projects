async function analyzeURL() {
  const input = document.getElementById("urlInput").value.trim();
  const result = document.getElementById("result");
  const reasonsList = document.getElementById("reasons");

  reasonsList.innerHTML = "";
  result.innerText = "";

  if (!input) {
    result.innerText = "Please enter a website URL";
    result.style.color = "orange";
    return;
  }

  let parsed;
  try {
    parsed = new URL(input.includes("://") ? input : `https://${input}`);
  } catch {
    result.innerText = "Invalid website URL";
    result.style.color = "orange";
    return;
  }

  const raw = input.toLowerCase();
  const host = parsed.hostname.toLowerCase();
  let riskScore = 0;

  if (parsed.protocol !== "https:") {
    addReason("Website is not using HTTPS encryption");
    riskScore += 2;
  }

  if (raw.length > 75) {
    addReason("URL is unusually long");
    riskScore++;
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    addReason("Website uses an IP address instead of a normal domain");
    riskScore += 2;
  }

  if (raw.includes("@")) {
    addReason("URL contains an @ symbol, which can hide the real destination");
    riskScore += 2;
  }

  if (host.startsWith("xn--")) {
    addReason("Internationalized/punycode domain detected; verify the spelling carefully");
    riskScore++;
  }

  if (host.split(".").length > 4) {
    addReason("Domain contains many subdomains");
    riskScore++;
  }

  const keywords = ["login", "verify", "secure", "update", "account", "signin", "confirm"];
  const keywordMatches = keywords.filter(word => raw.includes(word));
  keywordMatches.slice(0, 2).forEach(word => {
    addReason(`Suspicious keyword found: "${word}"`);
    riskScore++;
  });

  const higherRiskTlds = [".tk", ".ml", ".ga", ".cf", ".gq"];
  if (higherRiskTlds.some(tld => host.endsWith(tld))) {
    addReason("Higher-risk free/low-cost domain ending detected");
    riskScore++;
  }

  try {
    const response = await fetch("blacklist.json");
    if (!response.ok) throw new Error("Blacklist unavailable");
    const data = await response.json();

    if ((data.unsafe || []).some(site => host === site || host.endsWith(`.${site}`))) {
      addReason("Domain matched this demo project's local unsafe list");
      riskScore += 3;
    }
  } catch (error) {
    console.warn("Blacklist check skipped:", error);
    addReason("Local blacklist check could not be loaded");
  }

  if (riskScore >= 4) {
    result.innerText = `⚠️ Higher Risk — Score ${riskScore}`;
    result.style.color = "red";
  } else if (riskScore >= 2) {
    result.innerText = `⚠️ Some Risk Signs — Score ${riskScore}`;
    result.style.color = "orange";
  } else {
    result.innerText = `✅ No obvious risk signs — Score ${riskScore}`;
    result.style.color = "green";
  }
}

function addReason(text) {
  const li = document.createElement("li");
  li.innerText = text;
  document.getElementById("reasons").appendChild(li);
}
