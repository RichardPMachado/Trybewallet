import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailProps,
      totalProps,
    } = this.props;
    return (
      <>
        TrybeWallet
        <h3 data-testid="email-field">{ `Email: ${emailProps}` }</h3>
        <h3 data-testid="total-field">
          { (totalProps.reduce((acc, curr) => acc + curr, 0)).toFixed(2) }
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  emailProps: state.user.email,
  totalProps: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailProps: PropTypes.string.isRequired,
  totalProps: PropTypes.arrayOf.isRequired,
};
