export const GET_EMAIL = 'GET_EMAIL';
export const GET_PASSWORD = 'GET_PASSWORD';
export const INICIAL_REQ = 'INICIAL_REQ';
export const GET_API = 'GET_API';
export const FINAL_REQ = 'FINAL_REQ';
// // , GET_API, INICIAL_REQ, FINAL_REQ

export const actEmail = (payload) => ({ type: GET_EMAIL, payload });
export const inicialRequest = () => ({ type: INICIAL_REQ });
export const finalRequest = () => ({ type: FINAL_REQ });
export const responseApi = (payload) => ({ type: GET_API, payload });

// export const getRequest = () => async (dispatch) => {
//   try {
//     dispatch(inicialRequest());
//     const URL_API = 'https://api.thecatapi.com/v1/images/search?limit=5';
//     const response = await fetch(URL_API);
//     const result = await response.json();
//     dispatch(responseApi(result));
//     dispatch(finalRequest());
//   } catch (e) {
//     throw new Error(e);
//   }
// };
