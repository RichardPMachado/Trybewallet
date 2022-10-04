import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actExpensesDelete, actExpensesEdit } from '../redux/actions';
// import WalletForm from './WalletForm';

class Table extends Component {
  handleClick = (id) => {
    const { expensesPropsDelete, expensesProps } = this.props;
    const expensesFiltered = expensesProps.filter((e) => e.id !== id);
    // console.log(expensesFiltered);

    expensesPropsDelete(expensesFiltered);
  };

  handleClickEdit = (id) => {
    const { editDispatch } = this.props;
    editDispatch({ idToEdit: id });
  };

  render() {
    const { expensesProps } = this.props;
    // const { isWalletEdit } = this.state;
    return (
      <div>
        {/* {
          isWalletEdit && <WalletForm
            expensesProps={ expensesProps }
            isWalletEdit={ isWalletEdit }
          />
        } */}
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
            {expensesProps?.map((element) => {
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
                      data-testid="edit-btn"
                      type="submit"
                      onClick={ () => this.handleClickEdit(id) }
                    >
                      Edit
                    </button>
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
      </div>

    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expensesProps: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesPropsDelete: (state) => dispatch(actExpensesDelete(state)),
  editDispatch: (state) => dispatch(actExpensesEdit(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expensesProps: PropTypes.arrayOf.isRequired,
  expensesPropsDelete: PropTypes.func.isRequired,
  editDispatch: PropTypes.func.isRequired,
};
