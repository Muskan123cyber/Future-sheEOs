from flask import Flask, request, jsonify
from pqc_security import encrypt_transcript, sign_transcript, verify_transcript

app = Flask(__name__)

# ----------------------
# Home route
# ----------------------
@app.route("/")
def home():
    return "PQC-secured AI Banking Voice Platform is running!"

# ----------------------
# Submit route
# Encrypts transcript on submission
# ----------------------
@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    transcript = data.get("transcript", "")

    if not transcript:
        return jsonify({"error": "Transcript is required"}), 400

    # Encrypt transcript
    encrypted_payload = encrypt_transcript(transcript)

    # Optional: simulate customer approval by signing
    signature = sign_transcript(transcript)

    # Convert bytes to hex for JSON transport
    response = {
        "status": "received",
        "encrypted_transcript": encrypted_payload["ciphertext"].hex(),
        "nonce": encrypted_payload["nonce"].hex(),
        "encrypted_session_key": encrypted_payload["encrypted_session_key"].hex(),
        "signature": signature.hex(),
        "security": "Post-Quantum Ready"
    }

    return jsonify(response)

# ----------------------
# Run server
# ----------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
