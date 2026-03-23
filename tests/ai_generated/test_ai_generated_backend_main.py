from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.dependencies import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import get_db
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import normalize_username
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_email
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.main import validate_signup, hash_password
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.models import User
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SessionLocal
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SignupRequest
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

# AI_TEST_AGENT_START function=validate_email
def test_validate_email_valid_email():
    email = "user@domain.com"
    assert validate_email(email) == True

def test_validate_email_invalid_email_no_at():
    email = "userdomain.com"
    assert validate_email(email) == False

def test_validate_email_invalid_email_no_domain():
    email = "user@"
    assert validate_email(email) == False

def test_validate_email_invalid_email_no_local():
    email = "@domain.com"
    assert validate_email(email) == False

def test_validate_email_invalid_email_no_dot_in_domain():
    email = "user@domain"
    assert validate_email(email) == False

def test_validate_email_invalid_email_dot_at_start():
    email = ".user@domain.com"
    assert validate_email(email) == False

def test_validate_email_invalid_email_dot_at_end():
    email = "user@domain."
    assert validate_email(email) == False
# AI_TEST_AGENT_END function=validate_email

# AI_TEST_AGENT_START function=normalize_username
def test_normalize_username_valid():
    username = "user123"
    result = normalize_username(username)
    assert result == "user123"

def test_normalize_username_short():
    with pytest.raises(ValueError):
        normalize_username("ab")

def test_normalize_username_long():
    with pytest.raises(ValueError):
        normalize_username("a" * 31)

def test_normalize_username_non_alphanumeric():
    username = "user!@#"
    result = normalize_username(username)
    assert result == "user"

def test_normalize_username_multiple_dashes():
    username = "user--dash"
    result = normalize_username(username)
    assert result == "userdash"

def test_normalize_username_multiple_underscores():
    username = "user__dash"
    result = normalize_username(username)
    assert result == "userdash"
# AI_TEST_AGENT_END function=normalize_username

# AI_TEST_AGENT_START function=validate_signup
def test_validate_signup_valid():
    data = SignupRequest(username='user', email='a.b.com', password='validpass123')
    result = validate_signup(data)
    assert result is None

def test_validate_signup_username_too_short():
    data = SignupRequest(username='us', email='a.b.com', password='validpass123')
    result = validate_signup(data)
    assert result == "Username must be at least 4 characters long."

def test_validate_signup_email_invalid():
    data = SignupRequest(username='user', email='a@b', password='validpass123')
    result = validate_signup(data)
    assert result == "Email must be a valid address."

def test_validate_signup_password_too_short():
    data = SignupRequest(username='user', email='a.b.com', password='validpass')
    result = validate_signup(data)
    assert result == "Password must be at least 8 characters long."

def test_validate_signup_password_no_number():
    data = SignupRequest(username='user', email='a.b.com', password='validpass123abc')
    result = validate_signup(data)
    assert result == "Password must contain at least one number."

def test_validate_signup_all_invalid():
    data = SignupRequest(username='us', email='a@b', password='validpass')
    result = validate_signup(data)
    assert result == "Username must be at least 4 characters long.\nEmail must be a valid address.\nPassword must be at least 8 characters long.\nPassword must contain at least one number."
# AI_TEST_AGENT_END function=validate_signup
