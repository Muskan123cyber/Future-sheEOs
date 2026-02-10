from detector import PII_TYPES

def classify_pii(pii_items):
    for item in pii_items:
        item["risk_level"] = PII_TYPES.get(item["type"], "UNKNOWN")
    return pii_items
