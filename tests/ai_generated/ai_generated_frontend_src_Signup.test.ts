import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
import { render, fireEvent, waitFor } from '@testing-library/react';
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
// AI_TEST_AGENT_END function=Signup
