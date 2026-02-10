from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

def encrypt_pii(value):
    return cipher.encrypt(value.encode()).decode()

def encrypt_pii_items(pii_items):
    for item in pii_items:
        if item["risk_level"] in ["HIGH", "CRITICAL"]:
            item["encrypted"] = encrypt_pii(item["value"])
            del item["value"]
    return pii_items
