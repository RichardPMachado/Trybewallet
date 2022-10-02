import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Test login page', () => {
  it('checks if there is a login text', () => {
    renderWithRouterAndRedux(<App />);

    const loginText = screen.getByText(/login/i);
    expect(loginText).toBeInTheDocument();
  });

  it('checks if there is an email and password input on the screen', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('checks if the logs in and is redirected to the wallet page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = 'richard@test.com';
    const password = 'abcd12';

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.click(button);

    expect(button).not.toBeDisabled();
    expect(history.location.pathname).toBe('/carteira');
  });
});
