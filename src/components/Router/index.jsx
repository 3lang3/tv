import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';
import store from 'store';
import { syncHistoryWithStore } from 'react-router-redux';

import App from 'components/App';

import FourOhFour from 'components/FourohFour';
import { getMetadata, getCategory } from 'actions';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
store.dispatch(getCategory());

const getCategoryComp = (nextState, cb) => {
  require.ensure([], (require) => {
    cb(null, require('components/Category').default);
  }, 'category');
};
const getCategorysComp = (nextState, cb) => {
  require.ensure([], (require) => {
    cb(null, require('components/Categorys').default);
  }, 'categorys');
};
const getLiveComp = (nextState, cb) => {
  require.ensure([], (require) => {
    cb(null, require('components/Screen').default);
  }, 'live');
};
const getHotComp = (nextState, cb) => {
  require.ensure([], (require) => {
    cb(null, require('components/Hot').default);
  }, 'hot');
};

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getHotComp} />
    <Route path="categorys" getComponent={getCategoryComp} />
    <Route path="categorys/:name" getComponent={getCategorysComp} />
    <Route path="hot" getComponent={getHotComp} />
    <Route path="live" getComponent={getLiveComp} />
    <Route path="*" component={FourOhFour} />
  </Route>
);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

