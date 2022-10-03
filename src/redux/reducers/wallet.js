import { GET_API, EXPENSES_REQ, EXPENSES_DELETE } from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES_DELETE:
    return {
      ...state,
      expenses: action.payload.map((e, i) => {
        e.id = i;
        return e;
      }),
      // !payload ? []
      //   : (
      //     payload.map((e) => Number(e.value)
      // * Number(e.exchangeRates[e.currency].ask))),
    };
  case EXPENSES_REQ:
    // payload.id = state.expenses.length
    return {
      ...state,
      expenses: [...state.expenses, action.payload].map((e, i) => {
        e.id = i;
        return e;
      }),
      // total: [...state.total, ({
      //   id: payload.id,
      //   dinheiro: Number(payload.value)
      //   * Number(payload.exchangeRates[payload.currency].ask),
      // }),
      // ],
    };
  default:
    return state;
  }
};

export default wallet;
