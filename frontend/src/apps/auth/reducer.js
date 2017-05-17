import {
  RECEIVE_PROFILE,
  ERROR_PROFILE,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  ERROR_LOGIN,
  REQUEST_SIGNUP,
  RECEIVE_SIGNUP,
} from './actions';

const initialState = {
  profile: null,
  isFetchingProfile: true,
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: null,
  isSigningUp: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PROFILE:
      return {
        ...state,
        isLoggedIn: true,
        isFetchingProfile: false,
        profile: action.data,
      };

    case ERROR_PROFILE:
      return {
        ...state,
        isFetchingProfile: false,
      };

    case REQUEST_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };

    case RECEIVE_LOGIN:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        profile: action.data,
      };

    case ERROR_LOGIN:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        loginError: action.error,
        loginErrorMsg: action.error.extra.response.status === 401
          ? 'Either your username and/or password was incorrect'
          : 'There was an error logging in',
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
