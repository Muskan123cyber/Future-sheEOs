from pii_pipeline import process_transcript

with open("test_transcript.txt", "r") as f:
    transcript = f.read()

masked_output, encrypted_pii = process_transcript(transcript)

print("\nFINAL MASKED TRANSCRIPT (Employee View):\n")
print(masked_output)

print("\nENCRYPTED PII STORED SECURELY:\n")
for item in encrypted_pii:
    print(item)
