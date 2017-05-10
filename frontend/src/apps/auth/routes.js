import { Login, SignUp } from './components';

export default {
  '/login': Login,
  '/sign-up': SignUp,
  // logout should call the server to logout & rerender to nuke the application state
};
