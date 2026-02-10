# test_pqc.py
# Demonstrates encryption, decryption, signing, verification using simulated PQC

from pqcsecurity import encrypt_transcript, decrypt_transcript, sign_transcript, verify_transcript

def run_demo():
    transcript = "Customer asked about account balance."

    print("Original Transcript:")
    print(transcript)

    # Encrypt
    enc = encrypt_transcript(transcript)
    print("\nEncrypted Transcript (simulated):")
    print(enc)

    # Decrypt
    dec = decrypt_transcript(enc)
    print("\nDecrypted Transcript:")
    print(dec)

    # Sign
    sig = sign_transcript(transcript)
    print("\nSignature (simulated):")
    print(sig)

    # Verify
    valid = verify_transcript(transcript, sig)
    print("\nSignature Valid?:", valid)

if __name__ == "__main__":
    run_demo()
