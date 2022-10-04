export const GET_EMAIL = 'GET_EMAIL';
export const INITIAL_REQ = 'INITIAL_REQ';
export const FINAL_REQ = 'FINAL_REQ';
export const EXPENSES_REQ = 'EXPENSES_REQ';
export const EXPENSES_DELETE = 'EXPENSES_DELETE';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';
export const ACTIVE_EDIT = 'ACTIVE_EDIT';
export const ACTIVE_SUBMIT_EDIT = 'ACTIVE_SUBMIT_EDIT';

const URL_API = 'https://economia.awesomeapi.com.br/json/all';

export const GET_API = 'GET_API';

const actEmail = (payload) => ({ type: GET_EMAIL, payload });

const initialRequest = () => ({ type: INITIAL_REQ });
const finalRequest = () => ({ type: FINAL_REQ });
const responseApi = (payload) => ({ type: GET_API, payload });

const actExpenses = (payload) => ({ type: EXPENSES_REQ, payload });
const actExpensesDelete = (payload) => ({ type: EXPENSES_DELETE, payload });
const actExpensesEdit = (payload) => ({ type: ACTIVE_EDIT, payload });
const actExpensesSubmitEdit = (payload) => ({ type: ACTIVE_SUBMIT_EDIT, payload });

const fetchApi = async () => {
  const request = await fetch(URL_API);
  const response = await request.json();
  const key = 'USDT';
  delete response[key];
  return response;
};

const getCurrencyRequest = () => async (dispatch) => {
  dispatch(initialRequest());
  try {
    const response = await fetchApi();
    const currencies = Object.entries(response).map((e) => e[0]);
    dispatch(responseApi(currencies));
    dispatch(finalRequest());
  } catch (e) {
    throw new Error(e);
  }
};

const getExpensesRequest = (state) => async (dispatch) => {
  dispatch(initialRequest());
  try {
    const response = await fetchApi();
    const exchangeRates = response;
    const expenses = { ...state, exchangeRates };
    dispatch(actExpenses(expenses));
    dispatch(finalRequest());
  } catch (e) {
    throw new Error(e);
  }
};

export {
  actEmail, initialRequest,
  finalRequest, responseApi,
  getCurrencyRequest, actExpenses,
  getExpensesRequest, actExpensesDelete,
  actExpensesEdit, actExpensesSubmitEdit,
};
