import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { useAuth } from '../../context/AuthContext';


vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));


function renderLogin() {
    const mockLogin = vi.fn();
    useAuth.mockReturnValue({
        login: mockLogin
    });

    render(
        <MemoryRouter>
            <LoginPage/>
        </MemoryRouter>
    );

    return mockLogin;
}

describe('LoginPage', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
  });

  it('shows only the email error for an invalid email with a valid password', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText('Email'), 'notanemail');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.queryByText('Password is required.')).not.toBeInTheDocument();
  });

  it('calls login with the entered credentials on valid submit', async () => {
    const user = userEvent.setup();
    const mockLogin = renderLogin();

    await user.type(screen.getByLabelText('Email'), 'admin@alkira.com');
    await user.type(screen.getByLabelText('Password'), 'Password123!');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(mockLogin).toHaveBeenCalledWith('admin@alkira.com', 'Password123!');
  });

  it('shows a form-level error when login throws', async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn(() => {
      throw new Error('Invalid email or password.');
    });
    useAuth.mockReturnValue({ login: mockLogin });
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Email'), 'admin@alkira.com');
    await user.type(screen.getByLabelText('Password'), 'WrongPassword1');
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
  });
});