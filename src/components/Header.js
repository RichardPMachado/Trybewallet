import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email,
      total,
    } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ `Email: ${email}` }</h3>
        <h3 data-testid="total-field">
          { total.length < 1
            ? 0
            : (total.reduce((acc, curr) => acc + curr, 0)).toFixed(2) }
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.arrayOf.isRequired,
};
