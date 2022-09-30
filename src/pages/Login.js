import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actEmail } from '../redux/actions/index';

export class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
    isRedirected: false,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const minNumbersPassword = 6;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > minNumbersPassword;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isDisabled: !(btnState) });
  };

  handleClick = (event) => {
    event.preventDefault();
    console.log(event);
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(actEmail(email));
    console.log(dispatch);
    this.setState({ isRedirected: true });
  };

  render() {
    const { isDisabled, isRedirected, email, password } = this.state;
    return (
      <main>
        <div className="container-login">
          <form>
            <label htmlFor="email-input">
              E-mail
              <input
                data-testid="email-input"
                type="text"
                name="email"
                id="email-input"
                value={ email }
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                data-testid="password-input"
                type="password"
                name="password"
                id="password-input"
                value={ password }
                onChange={ this.handleInput }
              />
            </label>
            <button
              type="submit"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
        { isRedirected && <Redirect to="/carteira" /> }
      </main>

    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getCurrentISSLocation: () => dispatch(fetchIssLocation()),
// });

// const mapDispatchToProps = (dispatch) => ({
//   userDispatch: (state) => dispatch(actEmail(state)),
// });

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
