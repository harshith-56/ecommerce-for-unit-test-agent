from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.auth import validate_session
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.models import User
from ECOMMERCE_UNIT_TEST_AGENT_TESTING.backend.schemas import SignupRequest
from datetime import datetime, timedelta
import pytest

# AI_TEST_AGENT_START function=validate_session
def test_validate_session_valid_token():
    session = {"user_id": 1, "expires_at": datetime.utcnow() + timedelta(hours=1)}
    _sessions = {"token": session}
    assert validate_session("token") == 1

def test_validate_session_expired_token():
    session = {"user_id": 1, "expires_at": datetime.utcnow() - timedelta(hours=1)}
    _sessions = {"token": session}
    assert validate_session("token") is None

def test_validate_session_invalid_token():
    _sessions = {}
    assert validate_session("token") is None
# AI_TEST_AGENT_END function=validate_session
