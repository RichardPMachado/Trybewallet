import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email,
      expenses,
    } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">
          { (expenses.reduce((acc, curr) => acc + curr, 0)).toFixed(2) }
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.Wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};
