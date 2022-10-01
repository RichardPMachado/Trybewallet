import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Select from 'react-select';
import PropTypes from 'prop-types';
import { getExpensesRequest } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    payment: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { expensesDispatch } = this.props;
    expensesDispatch(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { description, value, method, currency, tag } = this.state;
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
              { currencies.map((e, i) => (
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
              name="method"
              value={ method }
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
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
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
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDispatch: (state) => dispatch(getExpensesRequest(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  // reponseApi: PropTypes.objectOf.isRequired,
  // getRequest: PropTypes.func.isRequired,
  expensesDispatch: PropTypes.func.isRequired,
};
