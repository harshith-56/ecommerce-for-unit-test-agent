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
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def validate_signup(data: SignupRequest) -> str | None:
    if len(data.username.strip()) < 3:
        return "Username must be at least 3 characters long."
    if "@" not in data.email:
        return "Email must contain '@'."
    if len(data.password) < 8:
        return "Password must be at least 8 characters long."
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