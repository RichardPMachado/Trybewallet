import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';
// import WalletForm from '../../components/WalletForm';

describe('Checar página de login', () => {
  it('Checar s e existe um email e password na tela', () => {
    renderWithRouterAndRedux(<App />);
    const emailText = screen.getByText('E-mail');
    const passwordText = screen.getByText('Senha');
    expect(emailText).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('verificar se ao clicar no Botão entrar, é redirecionado para a página wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = 'richard@test.com';
    const password = 'abcd12';

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    userEvent.click(button);
    expect(button).not.toBeDisabled();
    expect(history.location.pathname).toBe('/carteira');
  });
  it('Verifica funcionalidades da página /carteira', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valorText = screen.getByText(/valor:/i);
    const descricaoText = screen.getByText(/descrição:/i);
    expect(valorText).toBeInTheDocument();
    expect(descricaoText).toBeInTheDocument();

    const descricaoInput = screen.getByTestId('description-input');
    expect(descricaoInput).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();

    const buttonDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonDespesa).toBeInTheDocument();

    const valer = '10';
    const descricao = 'vai dar certo';

    userEvent.type(valer);
    userEvent.type(descricao);

    userEvent.click(buttonDespesa);
  });
});
