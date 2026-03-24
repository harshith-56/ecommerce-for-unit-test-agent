import signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';

// AI_TEST_AGENT_START function=signup
describe('signup function', () => {
  it('should return a valid signup response for a valid payload', async () => {
    const payload = { username: 'testuser', email: 'a@b.com', password: 'validpass123' };
    const mockResponse = { json: () => Promise.resolve({ token: 'mocktoken' }) };
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
    const result = await signup(payload);
    expect(result).toEqual({ token: 'mocktoken' });
  });

  it('should return an error for an invalid payload', async () => {
    const payload = { username: 'testuser' };
    const mockResponse = { json: () => Promise.resolve({ error: 'invalid payload' }) };
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
    const result = await signup(payload);
    expect(result).toEqual({ error: 'invalid payload' });
  });

  it('should return a network error for a failed fetch call', async () => {
    const payload = { username: 'testuser', email: 'a@b.com', password: 'validpass123' };
    const mockResponse = { json: () => Promise.reject(new Error('network error')) };
    jest.spyOn(global, 'fetch').mockRejectedValue(mockResponse);
    await expect(signup(payload)).rejects.toThrow('network error');
  });
});
// AI_TEST_AGENT_END function=signup
