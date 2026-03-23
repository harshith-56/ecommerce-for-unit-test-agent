from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup
import pytest

# AI_TEST_AGENT_START function=get_db
def test_get_db_valid():
    db = next(get_db())
    assert isinstance(db, SessionLocal)

def test_get_db_invalid():
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
    assert db1 != db2

def test_get_db_close_multiple_calls():
    db1 = next(get_db())
    db2 = next(get_db())
    db1.close()
    db2.close()
    with pytest.raises(Exception):
        next(get_db())

def test_get_db_close_after_yield():
    db = next(get_db())
    db.close()
    try:
        next(get_db())
    except Exception as e:
        assert isinstance(e, Exception)

def test_get_db_close_after_multiple_yields():
    db1 = next(get_db())
    db2 = next(get_db())
    db1.close()
    db2.close()
    try:
        next(get_db())
    except Exception as e:
        assert isinstance(e, Exception)
# AI_TEST_AGENT_END function=get_db

# AI_TEST_AGENT_START function=validate_signup
def test_validate_signup_valid_username():
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
# AI_TEST_AGENT_END function=validate_signup
