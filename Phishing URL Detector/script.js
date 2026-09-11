function checkURL() {
  const input = document.getElementById("urlInput").value.trim();
  const result = document.getElementById("result");

  if (!input) {
    result.innerText = "Please enter a URL";
    result.style.color = "orange";
    return;
  }

  let parsed;
  try {
    parsed = new URL(input.includes("://") ? input : `https://${input}`);
  } catch {
    result.innerText = "⚠️ Invalid URL format";
    result.style.color = "orange";
    return;
  }

  const raw = input.toLowerCase();
  const host = parsed.hostname.toLowerCase();
  let score = 0;

  if (raw.startsWith("http://")) score += 2;
  if (raw.includes("@")) score += 2;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) score += 2;
  if (raw.length > 75) score++;
  if (host.startsWith("xn--")) score++;
  if (host.split(".").length > 4) score++;
  if ((host.match(/-/g) || []).length >= 3) score++;

  const suspiciousWords = ["login", "verify", "secure", "update", "account", "signin", "confirm"];
  const matches = suspiciousWords.filter(word => raw.includes(word)).length;
  score += Math.min(matches, 2);

  if ([".tk", ".ml", ".ga", ".cf", ".gq"].some(tld => host.endsWith(tld))) score++;

  if (score >= 3) {
    result.innerText = "⚠️ Potential phishing risk detected";
    result.style.color = "red";
  } else {
    result.innerText = "✅ No obvious phishing signs found";
    result.style.color = "#00ffcc";
  }
}
