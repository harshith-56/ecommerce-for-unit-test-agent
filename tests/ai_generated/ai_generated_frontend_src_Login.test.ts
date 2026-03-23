import LoginForm from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Login';
import { validateLoginForm } from '../../ECOMMERCE_UNIT_TEST_AGENT_TESTING/frontend/src/Login';

// AI_TEST_AGENT_START function=validateLoginForm
describe('validateLoginForm', () => {
  it('should return an error if the email does not contain @', () => {
    const email = 'test';
    const password = 'password';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error if the password is less than 8 characters', () => {
    const email = 'test@example.com';
    const password = 'pass';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('should return null if the email and password are valid', () => {
    const email = 'test@example.com';
    const password = 'password123456';
    const result = validateLoginForm(email, password);
    expect(result).toBeNull();
  });

  it('should return an error if the email is empty', () => {
    const email = '';
    const password = 'password123456';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error if the password is empty', () => {
    const email = 'test@example.com';
    const password = '';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Password must be at least 8 characters.');
  });

  it('should return an error if the email contains multiple @', () => {
    const email = 'test@@example.com';
    const password = 'password123456';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error if the email contains no @', () => {
    const email = 'testexample.com';
    const password = 'password123456';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return an error if the email contains @ but no dot after @', () => {
    const email = 'test@example';
    const password = 'password123456';
    const result = validateLoginForm(email, password);
    expect(result).toBe('Please enter a valid email address.');
  });
});
// AI_TEST_AGENT_END function=validateLoginForm

// AI_TEST_AGENT_START function=LoginForm
describe('LoginForm', () => {
  describe('handleSubmit', () => {
    it('should call validateLoginForm and set error if invalid email', async () => {
      const mockValidateLoginForm = jest.fn().mockReturnValue('Invalid email');
      const mockSetStatus = jest.fn();
      const mockSetEmail = jest.fn();
      const mockSetPassword = jest.fn();
      const mockSetLoading = jest.fn();

      const LoginFormInstance = new LoginForm();
      LoginFormInstance.setEmail = mockSetEmail;
      LoginFormInstance.setPassword = mockSetPassword;
      LoginFormInstance.setStatus = mockSetStatus;
      LoginFormInstance.setLoading = mockSetLoading;
      LoginFormInstance.validateLoginForm = mockValidateLoginForm;

      await LoginFormInstance.handleSubmit({ preventDefault: jest.fn() } as any);

      expect(mockValidateLoginForm).toHaveBeenCalledTimes(1);
      expect(mockSetStatus).toHaveBeenCalledTimes(1);
      expect(mockSetStatus).toHaveBeenCalledWith({ success: false, error: 'Invalid email' });
    });

    it('should call login and set status if valid email', async () => {
      const mockValidateLoginForm = jest.fn().mockReturnValue(null);
      const mockSetStatus = jest.fn();
      const mockSetLoading = jest.fn();
      const mockLogin = jest.fn().mockResolvedValue({ success: true, message: 'Logged in' });

      const LoginFormInstance = new LoginForm();
      LoginFormInstance.setStatus = mockSetStatus;
      LoginFormInstance.setLoading = mockSetLoading;
      LoginFormInstance.validateLoginForm = mockValidateLoginForm;
      LoginFormInstance.login = mockLogin;

      await LoginFormInstance.handleSubmit({ preventDefault: jest.fn() } as any);

      expect(mockValidateLoginForm).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockSetStatus).toHaveBeenCalledTimes(1);
      expect(mockSetStatus).toHaveBeenCalledWith({ success: true, message: 'Logged in' });
    });
  });
});
// AI_TEST_AGENT_END function=LoginForm
