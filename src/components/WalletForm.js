import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Select from 'react-select';
import PropTypes from 'prop-types';
import { getExpensesRequest, actExpensesSubmitEdit } from '../redux/actions';

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

  // handleEdit = () => {
  //   const { idToEdit, expensesProps } = this.props;
  //   const editState = expensesProps.find((e) => e.id === idToEdit);
  //   this.setState({
  //     id: editState.id,
  //     value: editState.value,
  //     description: editState.description,
  //     currency: editState.currency,
  //     method: editState.method,
  //     tag: editState.tag,
  //   });
  // };

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

  handleSubmitEdit = (e) => {
    e.preventDefault();
    const { idToEdit, submitEditDispatch, expensesProps } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editExpenses = expensesProps;
    const expensesFinded = editExpenses.find((el) => el.id === idToEdit);
    expensesFinded.value = value;
    expensesFinded.description = description;
    expensesFinded.currency = currency;
    expensesFinded.method = method;
    expensesFinded.tag = tag;
    console.log(editExpenses);
    submitEditDispatch(editExpenses);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currenciesProps, editorProps } = this.props;
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
            // value={ !editor ? value : expensesProps.value }
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
            // value={ !editor ? description : expensesProps.description }
            value={ description }
            onChange={ this.handleChange }
          />
          {/* </label> */}
          {/* <label htmlFor="currency" > */}
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            // value={ !editor ? currency : expensesProps.currency }
            value={ currency }
            onChange={ this.handleChange }
          >
            Moeda:
            { currenciesProps?.map((e, i) => (
              <option key={ `${i}-${e}` }>{e}</option>
            ))}
          </select>
          {/* </label> */}
          {/* <label htmlFor="method" > */}
          <select
            data-testid="method-input"
            name="method"
            // value={ !editor ? method : expensesProps.method }
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
            // value={ !editor ? tag : expensesProps.tag }
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
          {!editorProps
            ? (
              <button
                type="submit"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
            : (
              <button
                type="submit"
                onClick={ this.handleSubmitEdit }
              >
                Editar despesa
              </button>
            ) }
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currenciesProps: state.wallet.currencies,
  editorProps: state.wallet.editor,
  expensesProps: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDispatch: (state) => dispatch(getExpensesRequest(state)),
  submitEditDispatch: (state) => dispatch(actExpensesSubmitEdit(state)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  currenciesProps: PropTypes.array,
  // currenciesDispatch: PropTypes.func.isRequired,
  // reponseApi: PropTypes.objectOf.isRequired,
  submitEditDispatch: PropTypes.func,
  expensesDispatch: PropTypes.func,
  expensesProps: PropTypes.object,
  idToEdit: PropTypes.number,
  editor: PropTypes.bool,
}.isRequie;
