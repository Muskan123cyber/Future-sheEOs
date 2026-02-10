def verify_with_customer(masked_transcript):
    print("\nCustomer Verification Required:")
    print(masked_transcript)
    approval = input("\nApprove transcript? (yes/no): ")
    return approval.lower() == "yes"
