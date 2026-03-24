import hashlib
import hmac
import secrets
from datetime import datetime, timedelta


SESSION_DURATION_MINUTES = 60
_sessions: dict[str, dict] = {}


def generate_session_token() -> str:
    return secrets.token_hex(32)


def create_session(user_id: int) -> str:
    token = generate_session_token()
    _sessions[token] = {
        "user_id": user_id,
        "created_at": datetime.utcnow(),
        "expires_at": datetime.utcnow() + timedelta(minutes=SESSION_DURATION_MINUTES),
    }
    return token


def validate_session(token: str) -> int | None:
    session = _sessions.get(token)
    if session is None:
        return None
    if datetime.utcnow() > session["expires_at"]:
        del _sessions[token]
        return None
    return session["user_id"]


def revoke_session(token: str) -> bool:
    if token in _sessions:
        del _sessions[token]
        return True
    return False


def verify_password(plain: str, hashed: str) -> bool:
    salted = f"ecomm_salt_{plain}"
    computed = hashlib.sha256(salted.encode("utf-8")).hexdigest()
    return hmac.compare_digest(computed, hashed)