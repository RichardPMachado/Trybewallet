import { GET_EMAIL } from '../../helpers/actionType';

const INITTIAL_STATE = {
  email: '',
  // password: '',
  name: '',
};

export default userReducer = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case GET_PASSWORD:
    return {
      ...state,
    };
  default:
    return state;
  }
};
