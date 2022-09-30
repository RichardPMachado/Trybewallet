import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="main-wallet">
        TrybeWallet
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default connect()(Wallet);
