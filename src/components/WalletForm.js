import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Select from 'react-select';
import PropTypes from 'prop-types';
import { getCurrencyRequest, getExpensesRequest } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

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
    const { currenciesProps } = this.props;
    const { description, value, method, currency, tag } = this.state;
    return (
      <div>
        <form>
          {/* <label htmlFor="value"> */}
          <span>Valor:</span>
          <input
            id="value"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          {/* </label> */}
          {/* <label htmlFor="description-input"> */}
          <span>Descrição:</span>
          <textarea
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          {/* </label> */}
          {/* <label htmlFor="currency" > */}
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            Moeda:
            { currenciesProps.map((e, i) => (
              <option key={ `${i}-${e}` }>{e}</option>
            ))}
          </select>
          {/* </label> */}
          {/* <label htmlFor="method" > */}
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            id="method"
            onChange={ this.handleChange }
          >
            Método de pagamento:
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          {/* </label> */}
          {/* <label htmlFor="tag" > */}
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            id="tag"
            onChange={ this.handleChange }
          >
            Tipo de gasto:
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {/* </label> */}
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
  currenciesProps: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDispatch: (state) => dispatch(getExpensesRequest(state)),
  currenciesDispatch: () => dispatch(getCurrencyRequest()),

});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  currenciesProps: PropTypes.arrayOf.isRequired,
  currenciesDispatch: PropTypes.func.isRequired,
  // reponseApi: PropTypes.objectOf.isRequired,
  // getRequest: PropTypes.func.isRequired,
  expensesDispatch: PropTypes.func.isRequired,
};
