import getpass
from datetime import datetime

# In production, this should integrate with your authentication system
AUTHORIZED_USERS = {
    "admin": "admin123",  # In production, use hashed passwords
    "supervisor": "super456"
}

AUDIT_LOG = []

def authorize_unmasking(reason):
    """Verify user authorization before unmasking"""
    print("\n" + "="*60)
    print("UNMASKING AUTHORIZATION REQUIRED")
    print("="*60)
    print(f"Reason: {reason}")
    print("-"*60)
    
    username = input("Username: ")
    password = getpass.getpass("Password: ")
    
    if username in AUTHORIZED_USERS and AUTHORIZED_USERS[username] == password:
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "user": username,
            "reason": reason,
            "status": "APPROVED"
        }
        AUDIT_LOG.append(log_entry)
        print(f"✓ Authorization granted to {username}")
        return True
    else:
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "user": username,
            "reason": reason,
            "status": "DENIED"
        }
        AUDIT_LOG.append(log_entry)
        print("✗ Authorization denied: Invalid credentials")
        return False

def get_audit_log():
    """Retrieve audit log of all unmasking attempts"""
    return AUDIT_LOG

def print_audit_log():
    """Print formatted audit log"""
    print("\n" + "="*60)
    print("UNMASKING AUDIT LOG")
    print("="*60)
    for entry in AUDIT_LOG:
        print(f"\nTimestamp: {entry['timestamp']}")
        print(f"User: {entry['user']}")
        print(f"Reason: {entry['reason']}")
        print(f"Status: {entry['status']}")
        print("-"*60)
