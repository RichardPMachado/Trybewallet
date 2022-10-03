import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actExpensesDelete } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { expensesProps, expensesPropsDelete } = this.props;
    const expensesFiltered = expensesProps.filter((e) => e.id !== id);
    expensesPropsDelete(expensesFiltered);
  };

  render() {
    const { expensesProps } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {expensesProps.map((element) => {
            const {
              id,
              description,
              tag,
              method,
              value,
              exchangeRates,
              currency,
            } = element;
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>BRL</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="submit"
                    onClick={ () => this.handleClick(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expensesProps: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesPropsDelete: (state) => dispatch(actExpensesDelete(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expensesProps: PropTypes.arrayOf.isRequired,
  expensesPropsDelete: PropTypes.func.isRequired,
};
