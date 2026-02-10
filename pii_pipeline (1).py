from detector import detect_pii
from classifier import classify_pii
from masker import mask_transcript
from encryptor import encrypt_pii_items
from verifier import verify_with_customer

def process_transcript(transcript):
    pii = detect_pii(transcript)
    pii = classify_pii(pii)

    masked = mask_transcript(transcript, pii)

    if verify_with_customer(masked):
        encrypted_pii = encrypt_pii_items(pii)
        return masked, encrypted_pii
    else:
        raise Exception("Customer rejected transcript")
