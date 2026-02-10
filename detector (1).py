PII_TYPES = {
    "NAME": "LOW",
    "EMAIL": "MEDIUM",
    "PHONE": "MEDIUM",
    "ACCOUNT_NUMBER": "HIGH",
    "CARD_NUMBER": "HIGH",
    "AADHAAR": "CRITICAL",
    "PAN": "CRITICAL",
    "IP_ADDRESS": "LOW"
}
import re

PII_PATTERNS = {
    "EMAIL": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
    "PHONE": r"\b[6-9]\d{9}\b",
    "AADHAAR": r"\b\d{4}\s\d{4}\s\d{4}\b",
    "PAN": r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",
    "ACCOUNT_NUMBER": r"\b\d{9,18}\b",
    "IP_ADDRESS": r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
}

def detect_pii(transcript):
    findings = []

    for pii_type, pattern in PII_PATTERNS.items():
        matches = re.findall(pattern, transcript)
        for match in matches:
            findings.append({
                "type": pii_type,
                "value": match
            })

    return findings
