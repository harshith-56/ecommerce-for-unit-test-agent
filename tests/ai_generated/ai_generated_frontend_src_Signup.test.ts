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
// AI_TEST_AGENT_END function=Signup
