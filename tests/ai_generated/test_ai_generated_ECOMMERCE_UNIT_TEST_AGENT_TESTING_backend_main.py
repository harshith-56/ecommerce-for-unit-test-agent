from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.dependencies import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.models import User
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SignupRequest
from pytest import raises
from sqlalchemy.exc import IntegrityError
from typing import Optional
from unittest.mock import Mock
import pytest

# AI_TEST_AGENT_START function=get_db
def test_get_db_success():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    assert db.query("SELECT 1") == [1]

def test_get_db_invalid_input():
    with pytest.raises(TypeError):
        next(get_db("invalid_input"))

def test_get_db_yield_multiple_times():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    assert db.query("SELECT 1") == [1]
    next(get_db())
    assert db.query("SELECT 1") == [1]

def test_get_db_close_db():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.close()
    with pytest.raises(AttributeError):
        db.query("SELECT 1")

def test_get_db_finally_block():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    try:
        db.query("SELECT 1")
    finally:
        assert db.close() is None

def test_get_db_multiple_yield():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.query("SELECT 1")
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.query("SELECT 1")
# AI_TEST_AGENT_END function=get_db

# AI_TEST_AGENT_START function=validate_signup
def test_validate_signup_valid():
    data = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = validate_signup(data)
    assert result is None

def test_validate_signup_invalid_username():
    data = SignupRequest(username='u', email='a@b.com', password='validpass123')
    result = validate_signup(data)
    assert result == "Username must be at least 3 characters long."

def test_validate_signup_invalid_email():
    data = SignupRequest(username='user', email='ab.com', password='validpass123')
    result = validate_signup(data)
    assert result == "Email must contain '@'."

def test_validate_signup_invalid_password():
    data = SignupRequest(username='user', email='a@b.com', password='validpass')
    result = validate_signup(data)
    assert result == "Password must be at least 8 characters long."

def test_validate_signup_invalid_type():
    data = 'not a SignupRequest'
    with pytest.raises(TypeError):
        validate_signup(data)

def test_validate_signup_missing_fields():
    data = SignupRequest(username='user', email='a@b.com')
    result = validate_signup(data)
    assert result == "Password must be at least 8 characters long."
# AI_TEST_AGENT_END function=validate_signup

# AI_TEST_AGENT_START function=signup
def test_signup_success():
    db = Mock()
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_error_username_too_short():
    db = Mock()
    payload = SignupRequest(username='us', email='a@b.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_error_email_invalid():
    db = Mock()
    payload = SignupRequest(username='user', email='ab.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_error_password_too_short():
    db = Mock()
    payload = SignupRequest(username='user', email='a@b.com', password='validpass')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_error_username_exists():
    db = Mock()
    db.add = Mock(side_effect=IntegrityError)
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_error_email_exists():
    db = Mock()
    db.add = Mock(side_effect=IntegrityError)
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_error_invalid_payload():
    db = Mock()
    payload = SignupRequest(username=123, email='a@b.com', password='validpass123')
    with raises(TypeError):
        signup(payload, db)

def test_signup_error_invalid_db():
    db = None
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    with raises(TypeError):
        signup(payload, db)
# AI_TEST_AGENT_END function=signup
