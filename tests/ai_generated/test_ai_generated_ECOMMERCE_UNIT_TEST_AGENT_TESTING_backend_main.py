from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.database import Session, get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup, validate_signup, hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.models import User
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SignupRequest
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.utils import hash_password
import pytest

# AI_TEST_AGENT_START function=get_db
def test_get_db_success():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.close()

def test_get_db_error_handling():
    with pytest.raises(Exception):
        next(get_db())

def test_get_db_valid_input():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.close()

def test_get_db_invalid_input():
    with pytest.raises(TypeError):
        next(get_db(123))

def test_get_db_invalid_type():
    with pytest.raises(TypeError):
        next(get_db("invalid"))

def test_get_db_edge_case():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.close()

def test_get_db_boundary_value():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.close()
# AI_TEST_AGENT_END function=get_db

# AI_TEST_AGENT_START function=signup
def test_signup_valid_success():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = Session()
    result = signup(payload, db)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_invalid_username():
    payload = SignupRequest(username='a', email='a@b.com', password='validpass123')
    db = Session()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_invalid_email():
    payload = SignupRequest(username='user', email='ab', password='validpass123')
    db = Session()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_invalid_password():
    payload = SignupRequest(username='user', email='a@b.com', password='short')
    db = Session()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_username_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = Session()
    db.add(User(username=payload.username, email=payload.email))
    db.commit()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_email_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = Session()
    db.add(User(username=payload.username, email=payload.email))
    db.commit()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_error_handling():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = Session()
    db.add(User(username=payload.username, email=payload.email))
    db.commit()
    db.rollback()
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."
# AI_TEST_AGENT_END function=signup
