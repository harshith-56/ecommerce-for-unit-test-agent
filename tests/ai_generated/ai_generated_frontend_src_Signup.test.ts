import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
import { FormEvent } from 'react';
import { jest } from '@jest/globals';
import { signup } from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';

// AI_TEST_AGENT_START function=Signup
jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api');

describe('Signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call signup with correct payload on submit', async () => {
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const event: FormEvent<HTMLFormElement> = {
      preventDefault: jest.fn(),
    };
    const setStatus = jest.fn();
    const setLoading = jest.fn();
    const setForm = jest.fn();

    const signupMock = jest.mocked(signup);
    signupMock.mockResolvedValue({ success: true, message: 'Signed up successfully' });

    const result = Signup({ form, setStatus, setLoading, setForm }, event);
    await result.handleSubmit(event);

    expect(signupMock).toHaveBeenCalledTimes(1);
    expect(signupMock).toHaveBeenCalledWith(form);
  });

  it('should display error message when signup fails', async () => {
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const event: FormEvent<HTMLFormElement> = {
      preventDefault: jest.fn(),
    };
    const setStatus = jest.fn();
    const setLoading = jest.fn();
    const setForm = jest.fn();

    const signupMock = jest.mocked(signup);
    signupMock.mockRejectedValue(new Error('Could not reach the server.'));

    const result = Signup({ form, setStatus, setLoading, setForm }, event);
    await result.handleSubmit(event);

    expect(setStatus).toHaveBeenCalledTimes(1);
    expect(setStatus).toHaveBeenCalledWith({ success: false, error: 'Could not reach the server.' });
  });

  it('should not call signup when form is empty', async () => {
    const form = { username: '', email: '', password: '' };
    const event: FormEvent<HTMLFormElement> = {
      preventDefault: jest.fn(),
    };
    const setStatus = jest.fn();
    const setLoading = jest.fn();
    const setForm = jest.fn();

    const signupMock = jest.mocked(signup);

    const result = Signup({ form, setStatus, setLoading, setForm }, event);
    await result.handleSubmit(event);

    expect(signupMock).not.toHaveBeenCalled();
  });

  it('should not call signup when form is invalid', async () => {
    const form = { username: 'user', email: 'invalid', password: 'short' };
    const event: FormEvent<HTMLFormElement> = {
      preventDefault: jest.fn(),
    };
    const setStatus = jest.fn();
    const setLoading = jest.fn();
    const setForm = jest.fn();

    const signupMock = jest.mocked(signup);

    const result = Signup({ form, setStatus, setLoading, setForm }, event);
    await result.handleSubmit(event);

    expect(signupMock).not.toHaveBeenCalled();
  });

  it('should not call signup when loading is true', async () => {
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const event: FormEvent<HTMLFormElement> = {
      preventDefault: jest.fn(),
    };
    const setStatus = jest.fn();
    const setLoading = jest.fn(() => true);
    const setForm = jest.fn();

    const signupMock = jest.mocked(signup);

    const result = Signup({ form, setStatus, setLoading, setForm }, event);
    await result.handleSubmit(event);

    expect(signupMock).not.toHaveBeenCalled();
  });
});
// AI_TEST_AGENT_END function=Signup
