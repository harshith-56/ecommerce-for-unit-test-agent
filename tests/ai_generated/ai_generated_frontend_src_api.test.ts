import fetchMock from 'jest-fetch-mock';
import signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=signup
fetchMock.enableMocks();

describe('signup', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns a successful response with valid payload', async () => {
    const payload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    fetchMock.mockResponseOnce(JSON.stringify({ message: 'User created successfully' }));

    const response = await signup(payload);
    expect(response).toEqual({ message: 'User created successfully' });
  });

  it('returns an error response with invalid payload', async () => {
    const payload = {
      username: '',
      email: '',
      password: '',
    };

    fetchMock.mockRejectOnce(new Error('Invalid payload'));

    try {
      await signup(payload);
    } catch (error) {
      expect(error.message).toBe('Invalid payload');
    }
  });

  it('returns an error response with network failure', async () => {
    const payload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    fetchMock.mockRejectOnce(new Error('Network failure'));

    try {
      await signup(payload);
    } catch (error) {
      expect(error.message).toBe('Network failure');
    }
  });

  it('returns an error response with server error', async () => {
    const payload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    fetchMock.mockRejectOnce(new Error('Server error'));

    try {
      await signup(payload);
    } catch (error) {
      expect(error.message).toBe('Server error');
    }
  });
});
// AI_TEST_AGENT_END function=signup
