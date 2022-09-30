import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actEmail } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    isDisabled: true,
    localEmail: '',
    localPassword: '',
    isRedirected: false,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const minNumbersPassword = 6;
    const { localEmail, localPassword } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(localEmail);
    const verifyPassword = localPassword.length >= minNumbersPassword;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isDisabled: !(btnState) });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { localEmail } = this.state;
    dispatch(actEmail(localEmail));
    console.log(dispatch);
    this.setState({ isRedirected: true });
  };

  render() {
    const { isDisabled, isRedirected, localEmail, localPassword } = this.state;
    return (
      <main>
        <div className="container-login">
          <form>
            <label htmlFor="email-input">
              E-mail
              <input
                data-testid="email-input"
                type="text"
                name="localEmail"
                id="email-input"
                value={ localEmail }
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                data-testid="password-input"
                type="password"
                name="localPassword"
                id="password-input"
                value={ localPassword }
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
