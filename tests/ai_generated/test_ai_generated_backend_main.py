from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup
from sqlalchemy.exc import IntegrityError
from unittest.mock import MagicMock
import pytest

# AI_TEST_AGENT_START function=validate_signup
def test_validate_signup_username_too_short():
    data = SignupRequest(username='ab', email='a@b.com', password='validpass123')
    result = validate_signup(data)
    assert result == "Username must be at least 3 characters long."

def test_validate_signup_email_invalid():
    data = SignupRequest(username='user', email='invalid', password='validpass123')
    result = validate_signup(data)
    assert result == "Email must contain '@'."

def test_validate_signup_password_too_short():
    data = SignupRequest(username='user', email='a@b.com', password='short')
    result = validate_signup(data)
    assert result == "Password must be at least 8 characters long."
# AI_TEST_AGENT_END function=validate_signup

# AI_TEST_AGENT_START function=signup
def test_signup_success():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_error_username_too_short():
    payload = SignupRequest(username='u', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_error_email_invalid():
    payload = SignupRequest(username='user', email='invalid', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_error_password_too_short():
    payload = SignupRequest(username='user', email='a@b.com', password='short')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_error_username_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit.side_effect = IntegrityError('msg', {}, None)
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_error_email_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit.side_effect = IntegrityError('msg', {}, None)
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."
# AI_TEST_AGENT_END function=signup
