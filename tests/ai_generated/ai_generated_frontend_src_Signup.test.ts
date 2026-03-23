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
  it('should return error when username is less than 4 characters', async () => {
    const signupRequest = { username: 'ab', email: 'a@b.com', password: 'validpass123' };
    const { status } = render(<Signup />);
    fireEvent.submit(status.container.querySelector('form')!, signupRequest);
    expect(status.getByText('Username must be at least 4 characters.')).toBeInTheDocument();
  });

  it('should return error when email is invalid', async () => {
    const signupRequest = { username: 'user', email: 'a@b', password: 'validpass123' };
    const { status } = render(<Signup />);
    fireEvent.submit(status.container.querySelector('form')!, signupRequest);
    expect(status.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('should return error when password is less than 8 characters', async () => {
    const signupRequest = { username: 'user', email: 'a@b.com', password: 'validpass' };
    const { status } = render(<Signup />);
    fireEvent.submit(status.container.querySelector('form')!, signupRequest);
    expect(status.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
  });

  it('should return success when form is valid', async () => {
    const signupRequest = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    const { status } = render(<Signup />);
    fireEvent.submit(status.container.querySelector('form')!, signupRequest);
    expect(status.getByText('You have been signed up!')).toBeInTheDocument();
  });

  it('should return error when server is down', async () => {
    const signupRequest = { username: 'user', email: 'a@b.com', password: 'validpass123' };
    jest.spyOn(signup, 'default').mockRejectedValueOnce(new Error('Server is down'));
    const { status } = render(<Signup />);
    fireEvent.submit(status.container.querySelector('form')!, signupRequest);
    expect(status.getByText('Could not reach the server.')).toBeInTheDocument();
  });
});
// AI_TEST_AGENT_END function=Signup
