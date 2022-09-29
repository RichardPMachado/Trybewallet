import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <main>
        <div className="container-login">
          <label htmlFor="email" data-testid="email-input">
            <input
              type="text"
              id="email"
              onChange={}
            />
          </label>
          <label htmlFor="password" data-testid="password-input">
            <input
              type="password"
              id="password"
              onChange={}
            />
          </label>
          <button
            type="Submit"
          >
            Acessar
          </button>
        </div>
      </main>

    );
  }
}

export default Login;
