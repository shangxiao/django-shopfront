import Link from './components/Link';
import Route from './route';
import history from './history';

// avoid importing router.js as may lead to circular imports which babel cannot handle yet (babel modules in testing)

export {
  Link,
  Route,
  history,
};
