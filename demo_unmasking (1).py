"""
Non-interactive demonstration of the unmasking functionality
"""
from detector import detect_pii
from classifier import classify_pii
from masker import mask_transcript
from encryptor import encrypt_pii_items, key
from decryptor import decrypt_pii_items
from unmasker import unmask_transcript

# Read test transcript
with open("test_transcript.txt", "r") as f:
    original_transcript = f.read()

print("="*70)
print("PII MASKING AND UNMASKING FLOW (Non-Interactive)")
print("="*70)

# Step 1: Original
print("\n📄 STEP 1: ORIGINAL TRANSCRIPT")
print("-"*70)
print(original_transcript)

# Step 2: Detect PII
pii = detect_pii(original_transcript)
print("\n🔍 STEP 2: DETECTED PII")
print("-"*70)
for item in pii:
    print(f"  - {item['type']}: {item['value']}")

# Step 3: Classify PII
pii = classify_pii(pii)
print("\n⚠️  STEP 3: CLASSIFIED PII BY RISK")
print("-"*70)
for item in pii:
    print(f"  - {item['type']}: {item['value']} [{item['risk_level']}]")

# Step 4: Mask transcript
masked = mask_transcript(original_transcript, pii)
print("\n🔒 STEP 4: MASKED TRANSCRIPT")
print("-"*70)
print(masked)

# Step 5: Encrypt high-risk PII
encrypted_pii = encrypt_pii_items(pii.copy())
print("\n🔐 STEP 5: ENCRYPTED HIGH/CRITICAL PII")
print("-"*70)
for item in encrypted_pii:
    print(f"  - {item['type']} [{item['risk_level']}]:", end=" ")
    if "encrypted" in item:
        print(f"Encrypted (first 40 chars): {item['encrypted'][:40]}...")
    else:
        print(f"Not encrypted, Value: {item['value']}")

# Step 6: Decrypt PII
print("\n🔓 STEP 6: DECRYPTING PII")
print("-"*70)
decrypted_pii = decrypt_pii_items(encrypted_pii, key)
print("✓ Decryption successful!")
for item in decrypted_pii:
    print(f"  - {item['type']}: {item['value']} [{item['risk_level']}]")

# Step 7: Unmask transcript
print("\n📄 STEP 7: UNMASKING TRANSCRIPT")
print("-"*70)
unmasked = unmask_transcript(masked, decrypted_pii)
print(unmasked)

# Step 8: Verify
print("\n✅ STEP 8: VERIFICATION")
print("-"*70)
if unmasked.strip() == original_transcript.strip():
    print("SUCCESS: Unmasked transcript perfectly matches the original!")
else:
    print("WARNING: Unmasked transcript differs from original")
    print(f"\nOriginal length: {len(original_transcript)}")
    print(f"Unmasked length: {len(unmasked)}")

print("\n" + "="*70)
print("DEMONSTRATION COMPLETE")
print("="*70)
