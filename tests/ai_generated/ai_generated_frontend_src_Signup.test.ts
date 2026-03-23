import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
import { signup } from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';

// AI_TEST_AGENT_START function=Signup
describe('Signup', () => {

it('should handle successful signup', async () => {
    const mockResponse = { success: true, message: 'Account created successfully' };
    jest.spyOn(signup, 'default').mockResolvedValue(mockResponse);
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign up');
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText('Account created successfully')).toBeInTheDocument());
    expect(signup).toHaveBeenCalledTimes(1);
    expect(signup).toHaveBeenCalledWith({ username: 'user', email: 'a@b.com', password: 'validpass123' });
  });

it('should handle failed signup', async () => {
    const mockResponse = { success: false, error: 'Could not reach the server.' };
    jest.spyOn(signup, 'default').mockRejectedValue(mockResponse);
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign up');
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText('Could not reach the server.')));
    expect(signup).toHaveBeenCalledTimes(1);
    expect(signup).toHaveBeenCalledWith({ username: 'user', email: 'a@b.com', password: 'validpass123' });
  });

it('should handle empty username', async () => {
    const mockResponse = { success: false, error: 'Username is required' };
    jest.spyOn(signup, 'default').mockRejectedValue(mockResponse);
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign up');
    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText('Username is required')));
    expect(signup).not.toHaveBeenCalled();
  });

it('should handle empty email', async () => {
    const mockResponse = { success: false, error: 'Email is required' };
    jest.spyOn(signup, 'default').mockRejectedValue(mockResponse);
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign up');
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText('Email is required')));
    expect(signup).not.toHaveBeenCalled();
  });

it('should handle empty password', async () => {
    const mockResponse = { success: false, error: 'Password is required' };
    jest.spyOn(signup, 'default').mockRejectedValue(mockResponse);
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign up');
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText('Password is required')));
    expect(signup).not.toHaveBeenCalled();
  });
});

describe('Signup', () => {
  it('should validate username length', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'ab', email: 'a@b.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(result.form.username.length).toBeGreaterThan(3);
  });

  it('should validate email address', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(result.form.email.includes('@')).toBe(true);
    expect(result.form.email.includes('.')).toBe(true);
  });

  it('should validate password length', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'user', email: 'a@b.com', password: 'short' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(result.form.password.length).toBeGreaterThan(7);
  });

  it('should display error message for invalid username', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'a', email: 'a@b.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(result.status.success).toBe(false);
    expect(result.status.error).toBe('Username must be at least 4 characters.');
  });

  it('should display error message for invalid email', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'user', email: 'ab.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(result.status.success).toBe(false);
    expect(result.status.error).toBe('Please enter a valid email address.');
  });

  it('should display error message for invalid password', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'user', email: 'a@b.com', password: 'short' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(result.status.success).toBe(false);
    expect(result.status.error).toBe('Password must be at least 8 characters.');
  });

  it('should call signup function with correct payload', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(signupSpy).toHaveBeenCalledWith({ username: 'user', email: 'a@b.com', password: 'validpass123' });
  });

  it('should display success message after successful signup', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.resolve({ success: true, message: 'Signup successful' }));
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(result.status.success).toBe(true);
    expect(result.status.message).toBe('Signup successful');
  });

  it('should display error message after failed signup', async () => {
    const signupSpy = jest.spyOn(signup, 'default');
    signupSpy.mockImplementationOnce(() => Promise.reject('Error'));
    const form = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const { result } = Signup({ form });
    await result.handleSubmit({ preventDefault: () => {} });
    expect(result.status.success).toBe(false);
    expect(result.status.error).toBe('Could not reach the server.');
  });
});
// AI_TEST_AGENT_END function=Signup
