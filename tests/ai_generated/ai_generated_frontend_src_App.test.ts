import App from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=App
describe('App component', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('renders Signup component', () => {
    render(<App />);
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('renders no error', () => {
    render(<App />);
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('renders error message when error occurs', () => {
    const error = new Error('Test error');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      throw error;
    });
    render(<App />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('renders success message when signup is successful', async () => {
    const signupSuccess = jest.fn(() => Promise.resolve({ message: 'Signup successful' }));
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Signup successful')).toBeInTheDocument());
    expect(signupSuccess).toHaveBeenCalledTimes(1);
  });

  it('renders error message when signup fails', async () => {
    const signupError = jest.fn(() => Promise.reject(new Error('Signup failed')));
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
    expect(signupError).toHaveBeenCalledTimes(1);
  });
});
// AI_TEST_AGENT_END function=App
