# 🔍 Website Safety & Trust Analyzer

A frontend educational tool that analyzes a pasted URL for common suspicious patterns and explains the reasons behind the result.

## 🔹 What This Project Checks
- HTTP vs HTTPS
- Very long URLs
- IP-address-based URLs
- `@` symbols that may hide destinations
- Punycode domains
- Excessive subdomains
- Phishing-related keywords
- Selected higher-risk domain endings
- A small local demo blacklist

## 🚀 Features
- Reason-based URL analysis
- Simple risk score
- Clear low / medium / higher-risk result
- Local JSON blacklist check
- Graceful fallback if blacklist data cannot load
- Security-themed frontend UI

## 🛠 Technologies Used
- HTML
- CSS
- JavaScript
- JSON

## 🎯 Use Case
- Cyber awareness demonstrations
- Frontend cybersecurity portfolio
- Learning URL-based phishing indicators

## ⚠ Disclaimer
This tool uses browser-side heuristics only. It does **not** verify SSL certificate validity, domain age, malware reputation, DNS records, page content, or real external threat-intelligence databases. A low score does not guarantee that a website is safe.

## 👨‍💻 Author
**Tanzeel Hussain**
