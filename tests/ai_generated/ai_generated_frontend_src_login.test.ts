import LoginForm from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/login';
import fetchMock from 'jest-fetch-mock';
import login from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/login';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { validateLoginForm } from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/login';

// AI_TEST_AGENT_START function=login
fetchMock.enableMocks();

describe('login function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return a successful login response with valid payload', async () => {
    const payload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'validpassword',
    };
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'testtoken' }));
    const response = await login(payload);
    expect(response).toEqual({ token: 'testtoken' });
  });

  it('should return an error response with invalid payload', async () => {
    const payload = {
      username: 'testuser',
      email: 'invalidemail',
      password: 'invalidpassword',
    };
    fetchMock.mockRejectOnce(new Error('Invalid payload'));
    await expect(login(payload)).rejects.toThrowError('Invalid payload');
  });

  it('should return an error response with network error', async () => {
    const payload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'validpassword',
    };
    fetchMock.mockRejectOnce(new Error('Network error'));
    await expect(login(payload)).rejects.toThrowError('Network error');
  });

  it('should return an error response with invalid token', async () => {
    const payload = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'validpassword',
    };
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'invalidtoken' }));
    await expect(login(payload)).rejects.toThrowError('Invalid token');
  });
});
// AI_TEST_AGENT_END function=login

// AI_TEST_AGENT_START function=validateLoginForm
describe('validateLoginForm', () => {
  it('should return an error when email is invalid', () => {
    const email = 'invalidemail';
    const password = 'validpassword';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error when password is too short', () => {
    const email = 'validemail@domain.com';
    const password = 'short';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('should return null when email and password are valid', () => {
    const email = 'validemail@domain.com';
    const password = 'validpassword123';
    const result = validateLoginForm(email, password);
    expect(result).toBeNull();
  });

  it('should return an error when email does not contain @', () => {
    const email = 'invalidemail';
    const password = 'validpassword';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error when password is too short (edge case)', () => {
    const email = 'validemail@domain.com';
    const password = 'a';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('should return an error when password is too short (boundary case)', () => {
    const email = 'validemail@domain.com';
    const password = '12345678';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('should return an error when email is empty', () => {
    const email = '';
    const password = 'validpassword';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error when password is empty', () => {
    const email = 'validemail@domain.com';
    const password = '';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Password must be at least 8 characters.');
  });
});
// AI_TEST_AGENT_END function=validateLoginForm

// AI_TEST_AGENT_START function=LoginForm
jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/login', () => ({
  validateLoginForm: jest.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('calls validateLoginForm with correct arguments when form is submitted', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    await waitFor(() => expect(validateLoginForm).toHaveBeenCalledTimes(1));
    expect(validateLoginForm).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('displays error message when form is submitted with invalid email', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument());
  });

  it('displays error message when form is submitted with password less than 8 characters', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument());
  });

  it('calls login with correct arguments when form is submitted and validateLoginForm returns null', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    await waitFor(() => expect(validateLoginForm).toHaveBeenCalledTimes(1));
    expect(validateLoginForm).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(validateLoginForm).toHaveBeenCalledTimes(1);
    expect(validateLoginForm).toHaveReturnedWith(null);
  });
});
// AI_TEST_AGENT_END function=LoginForm
