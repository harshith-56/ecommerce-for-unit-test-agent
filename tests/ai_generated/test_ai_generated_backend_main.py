from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup, validate_signup, hash_password
from unittest.mock import MagicMock
import pytest

# AI_TEST_AGENT_START function=get_db
def test_get_db_success():
    db = next(get_db())
    assert isinstance(db, object)
    db.close()

def test_get_db_error_handling():
    with pytest.raises(Exception):
        next(get_db())

def test_get_db_multiple_calls():
    db1 = next(get_db())
    db2 = next(get_db())
    assert db1 != db2
    db1.close()
    db2.close()
# AI_TEST_AGENT_END function=get_db

# AI_TEST_AGENT_START function=signup
def test_signup_valid_payload():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_invalid_payload():
    payload = SignupRequest(username='a', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_email_invalid():
    payload = SignupRequest(username='user', email='invalid_email', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_password_invalid():
    payload = SignupRequest(username='user', email='a@b.com', password='invalidpass')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_username_or_email_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = User(username='user', email='a@b.com')
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_db_commit_error():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit.side_effect = Exception('Test exception')
    db.rollback = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_db_rollback_error():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    db = MagicMock()
    db.add = MagicMock()
    db.commit = MagicMock()
    db.rollback.side_effect = Exception('Test exception')
    db.query.return_value.filter.return_value.first.return_value = None
    result = signup(payload, db)
    assert result.success == False
    assert result.error == "Username or email already exists."
# AI_TEST_AGENT_END function=signup
