from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup
from sqlalchemy.exc import IntegrityError
from unittest.mock import MagicMock
import pytest

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

def test_signup_failure_username_too_short():
    payload = SignupRequest(username='a', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_failure_email_invalid():
    payload = SignupRequest(username='user', email='invalid_email', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_failure_password_too_short():
    payload = SignupRequest(username='user', email='a@b.com', password='short')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_failure_username_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock(side_effect=IntegrityError("Duplicate entry 'user' for key 'username'", "", None))
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_failure_email_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock(side_effect=IntegrityError("Duplicate entry 'a@b.com' for key 'email'", "", None))
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."
# AI_TEST_AGENT_END function=signup
