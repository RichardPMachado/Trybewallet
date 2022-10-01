import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Select from 'react-select';
import PropTypes from 'prop-types';
import { fetchRatesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 1,
    value: '',
    description: '',
    currency: 'BRL',
    payment: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = (e) => {
    e.preventState();
    const { ratesDispatch } = this.props;
    // const { description, value, payment, currency, tag } = this.state;
    ratesDispatch(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'BRL',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { currenciesTest } = this.props;
    const { description, value, payment, currency, tag } = this.state;

    // const options = [{ value: 'code', label: 'code' }];
    // // const payment = [
    // //   { value: 'cash', label: 'Dinheiro' },
    // //   { value: 'credit', label: 'Cartão de crédito' },
    // //   { value: 'debit', label: 'Cartão de débito' },
    // // ];

    // const tag = [
    //   { value: 'food', label: 'Alimentação' },
    //   { value: 'fun', label: 'Lazer' },
    //   { value: 'work', label: 'Trabalho' },
    //   { value: 'transport', label: 'Transport' },
    //   { value: 'health', label: 'Saúde' },

    // ];

    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              data-testid="value-input"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              id="currency-input"
              value={ currency }
            >
              { currenciesTest.map((e, i) => (
                <option key={ `${i}-${e}` }>{e}</option>
              ))}
            </select>
          </label>
          {/* <span>
            Moeda:
          </span> */}
          {/* <Select
            options={ options }
            data-testid="currency-input"
            id="currency-input"
          /> */}
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              name="payment"
              value={ payment }
              data-testid="method-input"
              id="method-input"
              onChange={ this.handleChange }
            >
              <option value="cash">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tipo de gasto:
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              id="tag-input"
              onChange={ this.handleChange }
            >
              <option value="food">Alimentação</option>
              <option value="fun">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          {/*
          <span>
            Tipo de Gasto:
          </span>
           <Select
            options={ tag }
            data-testid="tag-input"
            id="currency-input"
          /> */}
          <label htmlFor="description-input">
            Descrição:
            <textarea
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="total-field"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesTest: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  ratesDispatch: (state) => dispatch(fetchRatesAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  currenciesTest: PropTypes.arrayOf.isRequired,
  // reponseApi: PropTypes.objectOf.isRequired,
  // getRequest: PropTypes.func.isRequired,
  // expenses: PropTypes.func.isRequired,
  ratesDispatch: PropTypes.func.isRequired,
};
