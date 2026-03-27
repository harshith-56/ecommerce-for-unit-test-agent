import signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';

// AI_TEST_AGENT_START function=signup
describe('signup', () => {

it('returns valid response for valid payload', async () => {
    const payload: signup.SignupPayload = {
      username: 'user',
      email: 'a@b.com',
      password: 'validpass123',
    };

    const response = await signup(payload);
    expect(response).toMatchSnapshot();
  });

it('returns error response for invalid payload', async () => {
    const payload: signup.SignupPayload = {
      username: 'user',
      email: 'invalidemail',
      password: 'shortpass',
    };

    const response = await signup(payload);
    expect(response).toMatchSnapshot();
  });

it('returns error response for missing required fields', async () => {
    const payload: signup.SignupPayload = {
      email: 'invalidemail',
      password: 'shortpass',
    };

    const response = await signup(payload);
    expect(response).toMatchSnapshot();
  });

it('returns error response for invalid email', async () => {
    const payload: signup.SignupPayload = {
      username: 'user',
      email: 'invalidemail',
      password: 'validpass123',
    };

    const response = await signup(payload);
    expect(response).toMatchSnapshot();
  });

it('returns error response for short password', async () => {
    const payload: signup.SignupPayload = {
      username: 'user',
      email: 'a@b.com',
      password: 'short',
    };

    const response = await signup(payload);
    expect(response).toMatchSnapshot();
  });

it('returns error response for invalid username', async () => {
    const payload: signup.SignupPayload = {
      username: 'invalidusername',
      email: 'a@b.com',
      password: 'validpass123',
    };

    const response = await signup(payload);
    expect(response).toMatchSnapshot();
  });

it('returns error response for network error', async () => {
    const payload: signup.SignupPayload = {
      username: 'user',
      email: 'a@b.com',
      password: 'validpass123',
    };

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      throw new Error('Network error');
    });

    try {
      await signup(payload);
    } catch (error) {
      expect(error.message).toBe('Network error');
    }
  });

it('returns error response for JSON parsing error', async () => {
    const payload: signup.SignupPayload = {
      username: 'user',
      email: 'a@b.com',
      password: 'validpass123',
    };

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return {
        json: () => {
          throw new Error('JSON parsing error');
        },
      };
    });

    try {
      await signup(payload);
    } catch (error) {
      expect(error.message).toBe('JSON parsing error');
    }
  });
});

describe('signup', () => {
  it('should return a successful signup response for valid payload', async () => {
    const payload = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'validpass123',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: true,
    });
  });

  it('should return an error response for invalid payload', async () => {
    const payload = {
      username: 'testuser',
      email: 'test',
      password: 'invalidpass',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: false,
      error: 'Invalid payload',
    });
  });

  it('should return an error response for missing required fields', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'validpass123',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: false,
      error: 'Missing required fields',
    });
  });

  it('should return an error response for invalid email', async () => {
    const payload = {
      username: 'testuser',
      email: 'invalidemail',
      password: 'validpass123',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: false,
      error: 'Invalid email',
    });
  });

  it('should return an error response for weak password', async () => {
    const payload = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'weakpass',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: false,
      error: 'Weak password',
    });
  });

  it('should return an error response for duplicate username', async () => {
    const payload = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'validpass123',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: false,
      error: 'Duplicate username',
    });
  });

  it('should return an error response for duplicate email', async () => {
    const payload = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'validpass123',
    };
    const response = await signup(payload);
    expect(response).toEqual({
      success: false,
      error: 'Duplicate email',
    });
  });
});
// AI_TEST_AGENT_END function=signup
