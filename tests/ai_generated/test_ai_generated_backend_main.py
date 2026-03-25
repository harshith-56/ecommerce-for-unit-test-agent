from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup, validate_signup, hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SignupRequest
from unittest.mock import MagicMock
import pytest

# AI_TEST_AGENT_START function=signup
def test_signup_valid_success():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_invalid_username():
    payload = SignupRequest(username='a', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_invalid_email():
    payload = SignupRequest(username='user', email='ab.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_invalid_password():
    payload = SignupRequest(username='user', email='a@b.com', password='short')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_username_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = User(username='user')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_email_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = User(email='a@b.com')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_db_error():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit.side_effect = Exception('Test exception')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."
# AI_TEST_AGENT_END function=signup
