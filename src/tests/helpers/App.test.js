import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Checar página de login', () => {
  it('Checar se existe um texto em login', () => {
    renderWithRouterAndRedux(<App />);
    const loginText = screen.getByText(/login/i);
    expect(loginText).toBeInTheDocument();
  });

  it('Checar s e existe um email e password na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('verificar se ao clicar na em entra, é redirecionado para a página wallet', () => {
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

  // userEvent.selectOptions()
});
