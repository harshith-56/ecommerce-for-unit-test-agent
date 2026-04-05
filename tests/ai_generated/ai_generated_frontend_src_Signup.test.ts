import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
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
    const mockSignup = jest.mocked(signup).mockResolvedValue({
      success: true,
      message: 'Signup successful',
    });
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Signup successful')).toBeInTheDocument()
    );
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });

it('handles failed signup', async () => {
    const mockSignup = jest.mocked(signup).mockRejectedValue({
      success: false,
      error: 'Could not reach the server.',
    });
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Could not reach the server.')).toBeInTheDocument()
    );
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });

it('handles invalid signup', async () => {
    const mockSignup = jest.mocked(signup).mockRejectedValue({
      success: false,
      error: 'Invalid username or password',
    });
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument()
    );
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });

it('handles disabled submit button', () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    expect(screen.getByRole('button')).toBeEnabled();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api');

describe('Signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('success')).toBeInTheDocument()
    );
  });

  it('submits form on valid input', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(signup).toHaveBeenCalledTimes(1)
    );
  });

  it('handles invalid form submission', async () => {
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

  it('displays error message on failed signup', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    signup.mockRejectedValueOnce({ success: false, error: 'Signup failed' });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Signup failed')).toBeInTheDocument()
    );
  });

  it('resets form on successful signup', async () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    signup.mockResolvedValueOnce({ success: true });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Create account')).toBeInTheDocument()
    );
    expect(screen.getByPlaceholderText('Username')).toHaveValue('');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
  });
});
// AI_TEST_AGENT_END function=Signup
