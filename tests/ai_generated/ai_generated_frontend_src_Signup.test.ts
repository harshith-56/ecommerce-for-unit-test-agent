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
// AI_TEST_AGENT_END function=Signup
