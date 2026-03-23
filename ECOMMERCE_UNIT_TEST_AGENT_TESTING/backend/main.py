import hashlib

from fastapi import Depends, FastAPI
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .db import Base, SessionLocal, engine
from .models import User
from .schemas import SignupRequest, SignupResponse


app = FastAPI()
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    salted = f"ecomm_salt_{password}"
    return hashlib.sha256(salted.encode("utf-8")).hexdigest()

def validate_email(email: str) -> bool:
    if "@" not in email:
        return False
    parts = email.split("@")
    if len(parts) != 2:
        return False
    local, domain = parts
    if not local or not domain:
        return False
    if "." not in domain:
        return False
    if domain.startswith(".") or domain.endswith("."):
        return False
    return True


def normalize_username(username: str) -> str:
    cleaned = username.strip().lower()
    cleaned = "".join(c for c in cleaned if c.isalnum() or c in ("_", "-"))
    if len(cleaned) < 4:
        raise ValueError(f"Username too short after normalization: '{cleaned}'")
    if len(cleaned) > 30:
        raise ValueError(f"Username too long after normalization: '{cleaned}'")
    return cleaned

def validate_signup(data: SignupRequest) -> str | None:
    if len(data.username.strip()) < 4:
        return "Username must be at least 4 characters long."
    if "@" not in data.email or "." not in data.email.split("@")[-1]:
        return "Email must be a valid address."
    if len(data.password) < 8:
        return "Password must be at least 8 characters long."
    if not any(c.isdigit() for c in data.password):
        return "Password must contain at least one number."
    return None



@app.post("/signup", response_model=SignupResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    error = validate_signup(payload)
    if error:
        return SignupResponse(success=False, error=error)

    user = User(
        username=payload.username.strip(),
        email=payload.email.strip(),
        password_hash=hash_password(payload.password),
    )
    db.add(user)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        return SignupResponse(
            success=False,
            error="Username or email already exists.",
        )

    return SignupResponse(success=True, message="User created successfully.")
