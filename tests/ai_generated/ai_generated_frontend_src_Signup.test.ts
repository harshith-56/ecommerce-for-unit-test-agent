import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=Signup
jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api');

describe('Signup component', () => {
  const initialForm = { username: '', email: '', password: '' };
  const signupPayload = {
    username: 'testuser',
    email: 'testemail@example.com',
    password: 'password123',
  };

  it('renders correctly', async () => {
    render(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('displays error message when signup fails', async () => {
    (signup as jest.Mock).mockRejectedValueOnce({
      success: false,
      error: 'Could not reach the server.',
    });
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'testemail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));
    await waitFor(() =>
      expect(screen.getByText('Could not reach the server.')),
    );
  });

  it('signs up successfully', async () => {
    const mockSignup = jest.fn().mockResolvedValueOnce({
      success: true,
      data: {},
    });
    (signup as jest.Mock) = mockSignup;
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'testemail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));
    await waitFor(() => expect(screen.getByText('')));
  });

  it('displays success message when signed up', async () => {
    const mockSignup = jest.fn().mockResolvedValueOnce({
      success: true,
      data: {},
    });
    (signup as jest.Mock) = mockSignup;
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'testemail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));
    await waitFor(() => expect(screen.getByText('')));
  });

  it('clears form fields when signed up', async () => {
    const mockSignup = jest.fn().mockResolvedValueOnce({
      success: true,
      data: {},
    });
    (signup as jest.Mock) = mockSignup;
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'testemail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Sign up'));
    await waitFor(() => expect(screen.getByPlaceholderText('Username')).toHaveValue(''));
    await waitFor(() => expect(screen.getByPlaceholderText('Email')).toHaveValue(''));
    await waitFor(() => expect(screen.getByPlaceholderText('Password')).toHaveValue(''));
  });
});
// AI_TEST_AGENT_END function=Signup
