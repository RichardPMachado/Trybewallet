import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  verifyBtn = () => {
    const minNumbersPassword = 6;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > minNumbersPassword;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isDisabled: !btnState });
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  handleClick = (event) => {
    event.preventDefault();
    // const { dispatch } = this.props;
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <main>
        <div className="container-login">
          <label htmlFor="email" data-testid="email-input">
            <input
              type="text"
              id="email"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="password" data-testid="password-input">
            <input
              type="password"
              id="password"
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </main>

    );
  }
}

export default Login;
