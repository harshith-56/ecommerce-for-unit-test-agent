import Signup from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Signup';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signup } from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api';

// AI_TEST_AGENT_START function=Signup
describe('Signup component', () => {
  it('renders correctly', () => {
    render(<Signup />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    const mockSignup = jest.fn(() => Promise.resolve({ success: true, message: 'Signed up successfully' }));
    jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api', () => ({ signup: mockSignup }));
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Signed up successfully')).toBeInTheDocument());
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });

  it('handles form submission with invalid data', async () => {
    const mockSignup = jest.fn(() => Promise.resolve({ success: false, error: 'Invalid data' }));
    jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api', () => ({ signup: mockSignup }));
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Invalid data')).toBeInTheDocument());
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });

  it('handles form submission with network error', async () => {
    const mockSignup = jest.fn(() => Promise.reject(new Error('Network error')));
    jest.mock('../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/api', () => ({ signup: mockSignup }));
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Could not reach the server.'))).toBeInTheDocument();
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });
});
// AI_TEST_AGENT_END function=Signup
