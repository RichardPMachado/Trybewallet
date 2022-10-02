import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { getCurrencyRequest } from '../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  render() {
    return (
      <div className="container-wallet">
        <header>
          <Header />
        </header>
        <div className="main-wallet">
          <div className="main-wallet-form">
            <WalletForm />
          </div>
          <Table />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(getCurrencyRequest()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currenciesDispatch: PropTypes.func.isRequired,
};
