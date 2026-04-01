import App from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=App
it('renders correctly', () => {
  render(<App />);
  expect(screen.getByText('Signup')).toBeInTheDocument();
});

it('renders signup form', () => {
  render(<App />);
  expect(screen.getByRole('form')).toBeInTheDocument();
});

it('renders username input field', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
});

it('renders email input field', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
});

it('renders password input field', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
});

it('renders submit button', () => {
  render(<App />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('handles user interaction', async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: 'testuser' },
  });
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'testuser@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'validpass123' },
  });
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() =>
    expect(screen.getByText('success')).toBeInTheDocument()
  );
});

it('renders error message', async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: '' },
  });
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() =>
    expect(screen.getByText('Username is required')).toBeInTheDocument()
  );
});

it('renders error message for invalid email', async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'invalidemail' },
  });
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() =>
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  );
});

it('renders error message for weak password', async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'weakpass' },
  });
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() =>
    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
  );
});
// AI_TEST_AGENT_END function=App
