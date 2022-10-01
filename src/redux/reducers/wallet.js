import { GET_API, EXPENSES_REQ } from '../actions';

const INITTIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  // case INICIAL_REQ:
  //   return {
  //     ...state,
  //     loading: true,
  //   };
  case GET_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSES_REQ:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
