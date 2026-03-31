import App from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=App
describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders signup form', () => {
    render(<App />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('renders error message on form submission', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'invalid' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'invalid' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    );
  });

  it('renders success message on valid form submission', async () => {
    render(<App />);
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
      expect(screen.getByText('Sign up successful')).toBeInTheDocument()
    );
  });
});
// AI_TEST_AGENT_END function=App
