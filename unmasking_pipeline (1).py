from decryptor import decrypt_pii_items
from unmasker import unmask_transcript
from authorizer import authorize_unmasking

def unmask_transcript_secure(masked_transcript, encrypted_pii, encryption_key, reason="Manual review"):
    """
    Securely unmask a transcript with authorization and decryption
    
    Args:
        masked_transcript: The masked transcript string
        encrypted_pii: List of PII items (some encrypted)
        encryption_key: The Fernet key used for encryption
        reason: Reason for unmasking (for audit log)
    
    Returns:
        Original unmasked transcript if authorized, None otherwise
    """
    # Step 1: Require authorization
    if not authorize_unmasking(reason):
        print("\n⚠ Unmasking operation cancelled: Authorization failed")
        return None
    
    # Step 2: Decrypt PII items
    try:
        decrypted_pii = decrypt_pii_items(encrypted_pii, encryption_key)
    except Exception as e:
        print(f"\n⚠ Decryption failed: {e}")
        return None
    
    # Step 3: Unmask the transcript
    try:
        original_transcript = unmask_transcript(masked_transcript, decrypted_pii)
    except Exception as e:
        print(f"\n⚠ Unmasking failed: {e}")
        return None
    
    print("\n✓ Transcript successfully unmasked")
    return original_transcript

def unmask_transcript_simple(masked_transcript, pii_items):
    """
    Unmask without encryption (for PII items that weren't encrypted)
    
    Args:
        masked_transcript: The masked transcript string
        pii_items: List of PII items with original values
    
    Returns:
        Unmasked transcript
    """
    return unmask_transcript(masked_transcript, pii_items)
