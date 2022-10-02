import { GET_API, EXPENSES_REQ } from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: [],
};

const wallet = (state = INITTIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      currencies: payload,
    };
  case EXPENSES_REQ:
    return {
      ...state,
      expenses: [...state.expenses, payload],
      total: [...state.total,
        Number(payload.value)
        * Number(payload.exchangeRates[payload.currency].ask),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
