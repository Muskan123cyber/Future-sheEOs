def get_mask_value(pii_type, value):
    """Generate the mask that would have been used for this PII value"""
    if pii_type in ["PHONE", "ACCOUNT_NUMBER"]:
        return value[:2] + "******" + value[-2:]
    elif pii_type in ["AADHAAR", "PAN"]:
        return "REDACTED"
    elif pii_type == "EMAIL":
        return "***@***.***"
    return "***"

def unmask_transcript(masked_transcript, pii_items):
    """Replace masked values with original PII values"""
    unmasked = masked_transcript
    
    for item in pii_items:
        if "value" in item:  # Only unmask if we have the original value
            mask = get_mask_value(item["type"], item["value"])
            unmasked = unmasked.replace(mask, item["value"])
    
    return unmasked
