from cryptography.fernet import Fernet

# This key should match the one used in encryptor.py
# In production, this should be securely stored (e.g., in a key vault)
# For now, we'll need to pass it from the encryption process

def decrypt_pii(encrypted_value, cipher):
    """Decrypt a single PII value"""
    return cipher.decrypt(encrypted_value.encode()).decode()

def decrypt_pii_items(encrypted_pii_items, key):
    """Decrypt all encrypted PII items"""
    cipher = Fernet(key)
    decrypted_items = []
    
    for item in encrypted_pii_items:
        decrypted_item = item.copy()
        if "encrypted" in decrypted_item:
            decrypted_item["value"] = decrypt_pii(decrypted_item["encrypted"], cipher)
            del decrypted_item["encrypted"]
        decrypted_items.append(decrypted_item)
    
    return decrypted_items
