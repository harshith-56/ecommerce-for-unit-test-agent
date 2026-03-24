import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signup } from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';

// AI_TEST_AGENT_START function=Signup
jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api');

describe('Signup', () => {

it('renders correctly', () => {
    render(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

it('handles successful signup', async () => {
    const mockSignup = jest.fn(() => Promise.resolve({ success: true }));
    signup.mockImplementation(mockSignup);

    render(<Signup />);
    const form = screen.getByRole('form');
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(screen.getByText('success')).toBeInTheDocument()
    );

    expect(mockSignup).toHaveBeenCalledTimes(1);
    expect(mockSignup).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', password: 'password123' });
  });
});

jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api');

describe('Signup', () => {

it('renders correctly', () => {
    render(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

it('renders form fields', () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

it('submits form with valid data', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'validpass123' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('success')).toBeInTheDocument()
    );
  });

it('submits form with invalid data', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Could not reach the server.')).toBeInTheDocument()
    );
  });

it('renders error message', async () => {
    render(<Signup />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Could not reach the server.')).toBeInTheDocument()
    );
  });

it('calls signup function with valid data', async () => {
    const signupMock = jest.mocked(signup);
    signupMock.mockResolvedValue({ success: true });
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'a@b.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'validpass123' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(signupMock).toHaveBeenCalledTimes(1)
    );
  });

it('calls signup function with invalid data', async () => {
    const signupMock = jest.mocked(signup);
    signupMock.mockResolvedValue({ success: false, error: 'Could not reach the server.' });
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(signupMock).toHaveBeenCalledTimes(1)
    );
  });
});

describe('Signup component', () => {
  it('renders correctly with valid form data', () => {
    render(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('renders correctly with invalid form data (username too short)', () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'ab' },
    });
    expect(screen.getByText('Username must be at least 4 characters.')).toBeInTheDocument();
  });

  it('renders correctly with invalid form data (email invalid)', () => {
    render(<Signup />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {
      target: { value: 'a@b' },
    });
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('renders correctly with invalid form data (password too short)', () => {
    render(<Signup />);
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, {
      target: { value: '1234' },
    });
    expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
  });

  it('handles user interaction with valid form data', async () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {
      target: { value: 'a@b.com' },
    });
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, {
      target: { value: 'validpass123' },
    });
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.getByText('success')).toBeInTheDocument()
    );
  });

  it('handles user interaction with invalid form data (username too short)', async () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'ab' },
    });
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {
      target: { value: 'a@b.com' },
    });
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, {
      target: { value: 'validpass123' },
    });
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.getByText('Username must be at least 4 characters.')).toBeInTheDocument()
    );
  });

  it('handles user interaction with invalid form data (email invalid)', async () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {
      target: { value: 'a@b' },
    });
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, {
      target: { value: 'validpass123' },
    });
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
    );
  });

  it('handles user interaction with invalid form data (password too short)', async () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {
      target: { value: 'a@b.com' },
    });
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, {
      target: { value: '1234' },
    });
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument()
    );
  });

  it('handles server error', async () => {
    const signupMock = jest.fn(() => Promise.reject(new Error('Server error')));
    jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api.ts', () => ({
      signup: signupMock,
    }));
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, {
      target: { value: 'a@b.com' },
    });
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, {
      target: { value: 'validpass123' },
    });
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.getByText('Could not reach the server.')).toBeInTheDocument()
    );
  });
});
// AI_TEST_AGENT_END function=Signup
