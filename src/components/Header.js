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
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// class Header extends Component {
//   test = () => {
//     const { expensesProps } = this.props;
//     const a = expensesProps.reduce((acc, curr) => {
//       acc += Number(curr.value)
//         * Number(curr.exchangeRates[curr.currency].ask);
//       return acc;
//     }, 0);
//     return a.toFixed(2);
//   };

//   render() {
//     const {
//       emailProps,
//       expensesProps,
//     } = this.props;
//     return (
//       <header>
//         TrybeWallet
//         <p data-testid="email-field">{ emailProps }</p>
//         <p data-testid="total-field">
//           { expensesProps.length > 0 ? this.test() : Number(0).toFixed(2) }
//         </p>
//         <p data-testid="header-currency-field">BRL</p>
//       </header>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   emailProps: state.user.email,
//   expensesProps: state.wallet.expenses,
// });

// export default connect(mapStateToProps)(Header);

// Header.propTypes = {
//   emailProps: PropTypes.string.isRequired,
//   expensesProps: PropTypes.arrayOf.isRequired,
// };
