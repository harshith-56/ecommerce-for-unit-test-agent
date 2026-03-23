from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup, validate_signup, hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup
import pytest

# AI_TEST_AGENT_START function=get_db
def test_get_db_success():
    db = next(get_db())
    assert isinstance(db, SessionLocal)
    db.close()

def test_get_db_error_handling():
    with pytest.raises(Exception):
        get_db()

def test_get_db_invalid_input():
    with pytest.raises(TypeError):
        next(get_db(123))

def test_get_db_yield_multiple_times():
    db = next(get_db())
    db2 = next(get_db())
    assert db != db2
    db.close()
    db2.close()

def test_get_db_yield_empty():
    db = next(get_db())
    assert db.query(None) is None
    db.close()

def test_get_db_yield_multiple_times_close():
    db = next(get_db())
    db2 = next(get_db())
    db.close()
    db2.close()
    with pytest.raises(Exception):
        next(get_db())
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

def test_validate_signup_empty_username():
    data = SignupRequest(username='', email='a@b.com', password='validpass123')
    result = validate_signup(data)
    assert result == "Username must be at least 3 characters long."

def test_validate_signup_empty_email():
    data = SignupRequest(username='user', email='', password='validpass123')
    result = validate_signup(data)
    assert result == "Email must contain '@'."

def test_validate_signup_empty_password():
    data = SignupRequest(username='user', email='a@b.com', password='')
    result = validate_signup(data)
    assert result == "Password must be at least 8 characters long."
# AI_TEST_AGENT_END function=validate_signup

# AI_TEST_AGENT_START function=signup
def test_signup_valid_success():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_valid_error_handling():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload)
    assert result.success == True
    assert result.message == "User created successfully."

def test_signup_invalid_username():
    payload = SignupRequest(username='a', email='a@b.com', password='validpass123')
    result = signup(payload)
    assert result.success == False
    assert result.error == "Username must be at least 3 characters long."

def test_signup_invalid_email():
    payload = SignupRequest(username='user', email='ab.com', password='validpass123')
    result = signup(payload)
    assert result.success == False
    assert result.error == "Email must contain '@'."

def test_signup_invalid_password():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass')
    result = signup(payload)
    assert result.success == False
    assert result.error == "Password must be at least 8 characters long."

def test_signup_username_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_email_exists():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload)
    assert result.success == False
    assert result.error == "Username or email already exists."

def test_signup_password_hashing():
    payload = SignupRequest(username='user', email='a@b.com', password='validpass123')
    result = signup(payload)
    assert isinstance(result, SignupResponse)
    assert isinstance(result.message, str)
    assert isinstance(result.success, bool)
    assert isinstance(result.error, str)
# AI_TEST_AGENT_END function=signup
