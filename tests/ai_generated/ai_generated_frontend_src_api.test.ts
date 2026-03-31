import signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=signup
describe('signup function', () => {
  it('should return a valid response for a valid payload', async () => {
    const response = {
      json: jest.fn().mockResolvedValue({ message: 'Signup successful' }),
    };
    const fetchMock = jest.fn().mockResolvedValue(response);
    global.fetch = fetchMock;

    const payload = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    const result = await signup(payload);
    expect(result).toEqual({ message: 'Signup successful' });
  });

  it('should return an error response for an invalid payload', async () => {
    const response = {
      json: jest.fn().mockResolvedValue({ message: 'Invalid payload' }),
    };
    const fetchMock = jest.fn().mockResolvedValue(response);
    global.fetch = fetchMock;

    const payload = { username: 'testuser', email: 'test@example.com' };
    const result = await signup(payload);
    expect(result).toEqual({ message: 'Invalid payload' });
  });

  it('should return a server error response for a server error', async () => {
    const response = {
      json: jest.fn().mockRejectedValue(new Error('Server error')),
    };
    const fetchMock = jest.fn().mockRejectedValue(response);
    global.fetch = fetchMock;

    const payload = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    await expect(signup(payload)).rejects.toThrowError('Server error');
  });

  it('should return a network error response for a network error', async () => {
    const fetchMock = jest.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = fetchMock;

    const payload = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    await expect(signup(payload)).rejects.toThrowError('Network error');
  });
});
// AI_TEST_AGENT_END function=signup
