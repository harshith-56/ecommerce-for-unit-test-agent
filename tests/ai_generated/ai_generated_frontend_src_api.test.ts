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
// AI_TEST_AGENT_END function=signup
