import App from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// AI_TEST_AGENT_START function=App
describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('renders Signup component', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Signup');
  });

  it('renders correctly with valid props', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Signup');
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('renders correctly with invalid props', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Signup');
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '' },
    });
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('renders correctly with empty props', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Signup');
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '' },
    });
    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });
});
// AI_TEST_AGENT_END function=App
