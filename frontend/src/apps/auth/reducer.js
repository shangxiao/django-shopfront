import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REQUEST_SIGNUP,
  RECEIVE_SIGNUP,
} from './actions';

const initialState = {
  isLoggingIn: false,
  isSigningUp: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {

    case REQUEST_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };

    case RECEIVE_LOGIN:
      return {
        ...state,
        isLoggingIn: false,
      };

    case REQUEST_SIGNUP:
      return {
        ...state,
        isSigningUp: true,
      };

    case RECEIVE_SIGNUP:
      return {
        ...state,
        isSigningUp: false,
      };

    default:
      return state;
  }
}
