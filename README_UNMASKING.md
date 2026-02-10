# PII Unmasking System

## Overview

This unmasking system works in conjunction with the existing PII masking pipeline to securely restore original transcript data when authorized.

## Components

### 1. `decryptor.py`
Handles decryption of encrypted PII values.

**Key Functions:**
- `decrypt_pii(encrypted_value, cipher)` - Decrypt a single PII value
- `decrypt_pii_items(encrypted_pii_items, key)` - Decrypt all encrypted PII items in a list

### 2. `unmasker.py`
Replaces masked values in transcript with original values.

**Key Functions:**
- `get_mask_value(pii_type, value)` - Generate the mask pattern for a PII value
- `unmask_transcript(masked_transcript, pii_items)` - Replace all masked values with originals

### 3. `authorizer.py`
Provides authorization and audit logging for unmasking operations.

**Key Functions:**
- `authorize_unmasking(reason)` - Verify user credentials before unmasking
- `get_audit_log()` - Retrieve audit trail
- `print_audit_log()` - Display formatted audit log

**Default Credentials:**
- Username: `admin`, Password: `admin123`
- Username: `supervisor`, Password: `super456`

⚠️ **In production, replace with secure authentication system and hashed passwords**

### 4. `unmasking_pipeline.py`
Main pipeline that orchestrates the complete unmasking process.

**Key Functions:**
- `unmask_transcript_secure()` - Full secure unmasking with authorization and decryption
- `unmask_transcript_simple()` - Simple unmasking without encryption (for low-risk PII)

## Usage Examples

### Basic Unmasking (Non-Interactive Demo)

```python
python demo_unmasking.py
```

This demonstrates the complete flow:
1. Original transcript
2. PII detection
3. PII classification
4. Masking
5. Encryption
6. Decryption
7. Unmasking
8. Verification

### Secure Unmasking with Authorization

```python
from unmasking_pipeline import unmask_transcript_secure
from encryptor import key

# After processing a transcript and getting masked output + encrypted PII
unmasked = unmask_transcript_secure(
    masked_transcript=masked_output,
    encrypted_pii=encrypted_pii,
    encryption_key=key,
    reason="Customer support escalation"
)
```

### Simple Unmasking (No Encryption)

```python
from unmasking_pipeline import unmask_transcript_simple

# For PII that wasn't encrypted (LOW/MEDIUM risk)
unmasked = unmask_transcript_simple(
    masked_transcript=masked_output,
    pii_items=pii_items  # Must have 'value' field
)
```

## Security Features

### 1. Authorization
- Username/password verification required
- Configurable authorized users
- Can integrate with enterprise authentication systems

### 2. Audit Logging
- All unmasking attempts logged
- Tracks: timestamp, user, reason, status
- Permanent audit trail for compliance

### 3. Encryption
- HIGH and CRITICAL risk PII encrypted with Fernet (symmetric encryption)
- Encryption key required for decryption
- Key should be stored in secure key vault in production

### 4. Role-Based Access
- Only authorized personnel can unmask
- Reason required for each unmasking operation
- Failed attempts logged

## Workflow

```
┌─────────────────┐
│ Masked          │
│ Transcript      │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Authorization   │
│ Required        │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Decrypt PII     │
│ (if encrypted)  │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Replace Masked  │
│ Values          │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Original        │
│ Transcript      │
└─────────────────┘
```

## Testing

Run the demonstration:
```bash
python demo_unmasking.py
```

Run with interactive authorization:
```bash
python test_unmasking.py
```
(Use username: `admin`, password: `admin123`)

## Production Considerations

### Security Hardening
1. **Key Management**: Store encryption keys in a secure key vault (AWS KMS, Azure Key Vault, HashiCorp Vault)
2. **Authentication**: Integrate with SSO/LDAP/Active Directory
3. **Password Hashing**: Use bcrypt, argon2, or PBKDF2 for password storage
4. **Audit Storage**: Persist audit logs to secure, immutable storage
5. **Network Security**: Ensure TLS/SSL for all communications
6. **Access Control**: Implement fine-grained RBAC (Role-Based Access Control)

### Compliance
- Ensure audit logs meet regulatory requirements (GDPR, HIPAA, PCI-DSS)
- Implement data retention policies
- Regular security audits
- Encryption key rotation

### Performance
- Cache decrypted values temporarily (with strict TTL)
- Batch processing for multiple transcripts
- Async operations for large-scale unmasking

## File Structure

```
├── decryptor.py          # Decryption logic
├── unmasker.py           # Unmasking logic
├── authorizer.py         # Authorization & audit
├── unmasking_pipeline.py # Main pipeline
├── demo_unmasking.py     # Non-interactive demo
├── test_unmasking.py     # Interactive test
└── README_UNMASKING.md   # This file
```

## Integration with Existing System

The unmasking system integrates seamlessly with your existing PII pipeline:

```python
# Existing masking pipeline
from pii_pipeline import process_transcript
masked, encrypted_pii = process_transcript(transcript)

# New unmasking capability
from unmasking_pipeline import unmask_transcript_secure
from encryptor import key

original = unmask_transcript_secure(
    masked, 
    encrypted_pii, 
    key,
    reason="Compliance audit"
)
```

## API Reference

### decrypt_pii_items(encrypted_pii_items, key)
Decrypt all PII items that were encrypted.

**Parameters:**
- `encrypted_pii_items` (list): PII items with 'encrypted' field
- `key` (bytes): Fernet encryption key

**Returns:**
- list: PII items with 'value' field restored

### unmask_transcript(masked_transcript, pii_items)
Replace masked values with original values.

**Parameters:**
- `masked_transcript` (str): Transcript with masked PII
- `pii_items` (list): PII items with 'value' field

**Returns:**
- str: Original unmasked transcript

### authorize_unmasking(reason)
Verify user authorization.

**Parameters:**
- `reason` (str): Reason for unmasking

**Returns:**
- bool: True if authorized, False otherwise

## License

Ensure compliance with your organization's security and privacy policies.
