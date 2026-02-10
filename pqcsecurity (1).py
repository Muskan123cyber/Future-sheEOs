# pqc_security.py
# Simulated Post-Quantum Crypto module for hackathon integration
# Works in Python 3.13

import os

# ==========================
# Encrypt / Decrypt
# ==========================
def encrypt_transcript(text: str) -> dict:
    """
    Simulate encryption of a transcript.
    Returns a dict containing ciphertext and a fake key.
    """
    # Reverse text as a simple “encryption” simulation
    ciphertext = text[::-1].encode()
    fake_key = os.urandom(16)  # random bytes to simulate a key
    return {
        "ciphertext": ciphertext,
        "key": fake_key
    }

def decrypt_transcript(ct_bundle: dict) -> str:
    """
    Simulate decryption of a transcript.
    Expects the dictionary returned by encrypt_transcript.
    """
    ciphertext = ct_bundle["ciphertext"]
    # Reverse again to get original text
    return ciphertext[::-1].decode()

# ==========================
# Sign / Verify
# ==========================
def sign_transcript(text: str) -> bytes:
    """
    Simulate signing a transcript.
    Returns a fake signature (bytes).
    """
    return b"SIGN_" + text.encode()

def verify_transcript(text: str, signature: bytes) -> bool:
    """
    Simulate signature verification.
    Returns True if signature matches simulated signing logic.
    """
    return signature == b"SIGN_" + text.encode()
