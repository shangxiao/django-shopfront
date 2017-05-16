import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';

export default connect(store => ({
  route: store.router.route,
}))(({ route }) => {
  const Page = route.page;
  const pageInstance = Page ? <Page /> : null;

  return (
    <div>
      <Menu />
      <div className="container layout">
        { pageInstance }
      </div>
    </div>
  );
});
