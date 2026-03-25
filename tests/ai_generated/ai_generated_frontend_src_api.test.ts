import signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=signup
describe('signup', () => {
  it('returns valid response for valid payload', async () => {
    const payload = {
      username: 'user',
      email: 'a@b.com',
      password: 'validpass123',
    };

    jest.mock('node-fetch', () => jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      }),
    ));

    const response = await signup(payload);
    expect(response).toEqual({ success: true });
  });

  it('returns error response for invalid payload', async () => {
    const payload = {
      username: '',
      email: '',
      password: '',
    };

    jest.mock('node-fetch', () => jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, error: 'Invalid payload' }),
      }),
    ));

    const response = await signup(payload);
    expect(response).toEqual({ success: false, error: 'Invalid payload' });
  });

  it('returns error response for network error', async () => {
    const payload = {
      username: 'user',
      email: 'a@b.com',
      password: 'validpass123',
    };

    jest.mock('node-fetch', () => jest.fn(() =>
      Promise.reject(new Error('Network error')),
    ));

    const response = await signup(payload);
    expect(response).toEqual({ success: false, error: 'Network error' });
  });

  it('returns error response for JSON parsing error', async () => {
    const payload = {
      username: 'user',
      email: 'a@b.com',
      password: 'validpass123',
    };

    jest.mock('node-fetch', () => jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error('JSON parsing error')),
      }),
    ));

    const response = await signup(payload);
    expect(response).toEqual({ success: false, error: 'JSON parsing error' });
  });
});
// AI_TEST_AGENT_END function=signup
