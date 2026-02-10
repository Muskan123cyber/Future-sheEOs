def mask_value(pii_type, value):
    if pii_type in ["PHONE", "ACCOUNT_NUMBER"]:
        return value[:2] + "******" + value[-2:]
    elif pii_type in ["AADHAAR", "PAN"]:
        return "REDACTED"
    elif pii_type == "EMAIL":
        return "***@***.***"
    return "***"

def mask_transcript(transcript, pii_items):
    masked = transcript
    for item in pii_items:
        masked = masked.replace(item["value"],
                                 mask_value(item["type"], item["value"]))
    return masked
