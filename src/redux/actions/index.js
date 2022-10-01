export const GET_EMAIL = 'GET_EMAIL';
export const INITIAL_REQ = 'INITIAL_REQ';
export const FINAL_REQ = 'FINAL_REQ';
export const EXPENSES_REQ = 'EXPENSES_REQ';

export const GET_API = 'GET_API';

const actEmail = (payload) => ({ type: GET_EMAIL, payload });
const initialRequest = () => ({ type: INITIAL_REQ });
const finalRequest = () => ({ type: FINAL_REQ });
const responseApi = (payload) => ({ type: GET_API, currencies: payload });

const getCurrencyRequest = () => async (dispatch) => {
  const URL_API = 'https://economia.awesomeapi.com.br/json/all';
  dispatch(initialRequest());
  try {
    const request = await fetch(URL_API);
    const response = await request.json();
    delete response.USDT;
    const currencies = Object.entries(response).map((e) => e[0]);
    dispatch({ type: GET_API, currencies });
    // dispatch(finalRequest());
  } catch (e) {
    throw new Error(e);
  }
};

const fetchRatesAction = (state) => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(url);
  const response = await request.json();
  const key = 'USDT';
  delete response[key];
  const exchangeRates = response;
  const expenses = { ...state, exchangeRates };
  dispatch({ type: EXPENSES_REQ, expenses });
};

const actExpenses = (payload) => ({ type: EXPENSES_REQ, expenses: payload });

export {
  actEmail, initialRequest,
  finalRequest, responseApi,
  getCurrencyRequest, actExpenses,
  fetchRatesAction,
};
