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
    method: 'Dinheiro',
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
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { description, value, method, currency, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value" data-testid="value-input">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency" data-testid="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((e, i) => (
                <option key={ `${i}-${e}` }>{e}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method" data-testid="method-input">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              id="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag" data-testid="tag-input">
            Tipo de gasto:
            <select
              name="tag"
              value={ tag }
              id="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
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
