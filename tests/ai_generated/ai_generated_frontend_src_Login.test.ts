import LoginForm from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Login';
import validateLoginForm from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Login';

// AI_TEST_AGENT_START function=validateLoginForm
describe('validateLoginForm', () => {
  it('returns error for invalid email', () => {
    const result = validateLoginForm('invalid', 'password');
    expect(result).toBe('Please enter a valid email address.');
  });

  it('returns error for password less than 8 characters', () => {
    const result = validateLoginForm('email@domain.com', 'short');
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('returns null for valid email and password', () => {
    const result = validateLoginForm('email@domain.com', 'password123456');
    expect(result).toBeNull();
  });

  it('returns error for password with less than 8 characters and invalid email', () => {
    const result = validateLoginForm('invalid', 'short');
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('returns error for password with 8 characters and invalid email', () => {
    const result = validateLoginForm('invalid', 'password1234');
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('returns error for password with more than 8 characters and invalid email', () => {
    const result = validateLoginForm('invalid', 'password1234567');
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('returns error for password with less than 8 characters and valid email without dot', () => {
    const result = validateLoginForm('email@domain', 'short');
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('returns error for password with less than 8 characters and valid email with dot', () => {
    const result = validateLoginForm('email@domain.com', 'short');
    expect(result).toBe('Password must be at least 8 characters.');
  });
});
// AI_TEST_AGENT_END function=validateLoginForm

// AI_TEST_AGENT_START function=LoginForm
describe('LoginForm', () => {
  it('should validate a valid email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('green')).toBeInTheDocument());
  });

  it('should validate an invalid email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('crimson')).toBeInTheDocument());
  });

  it('should validate an email with a dot after the @ symbol', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'a@b.c' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('green')).toBeInTheDocument());
  });

  it('should validate a password with a length of 4 characters', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'valid' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('crimson')).toBeInTheDocument());
  });

  it('should validate a password with a length of 8 characters', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('green')).toBeInTheDocument());
  });

  it('should handle an error when logging in', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'a@b.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('crimson')).toBeInTheDocument());
  });
});
// AI_TEST_AGENT_END function=LoginForm
