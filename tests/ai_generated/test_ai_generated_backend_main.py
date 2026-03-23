from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.dependencies import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup, hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.models import User
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SessionLocal
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SignupRequest, SignupResponse
import pytest

# AI_TEST_AGENT_START function=get_db
def test_get_db_success():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    assert db.query(User).first() is None

def test_get_db_error():
    with pytest.raises(Exception):
        next(get_db())

def test_get_db_close():
    db = next(get_db())
    db.close()
    with pytest.raises(Exception):
        next(get_db())

def test_get_db_multiple_calls():
    db1 = next(get_db())
    db2 = next(get_db())
    assert db1 is not db2
    db1.close()
    db2.close()

def test_get_db_invalid_input():
    with pytest.raises(TypeError):
        next(get_db(123))

def test_get_db_invalid_type():
    with pytest.raises(TypeError):
        next(get_db("invalid"))
# AI_TEST_AGENT_END function=get_db

# AI_TEST_AGENT_START function=signup
def test_signup_valid_success(db: Session = Depends(get_db)):
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_invalid_username(db: Session = Depends(get_db)):
    payload = SignupRequest(username='a', email='a@b.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_invalid_email(db: Session = Depends(get_db)):
    payload = SignupRequest(username='user', email='ab.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_invalid_password(db: Session = Depends(get_db)):
    payload = SignupRequest(username='user', email='a@b.com', password='validpass')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_username_exists(db: Session = Depends(get_db)):
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db.add(User(username=payload.username.strip(), email=payload.email.strip(), password_hash=hash_password(payload.password)))
    db.commit()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_email_exists(db: Session = Depends(get_db)):
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db.add(User(username=payload.username.strip(), email=payload.email.strip(), password_hash=hash_password(payload.password)))
    db.commit()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_invalid_payload(db: Session = Depends(get_db)):
    payload = SignupRequest()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_invalid_db(db: Session = Depends(get_db)):
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = None
    with pytest.raises(AttributeError):
        signup(payload, db)
# AI_TEST_AGENT_END function=signup
