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
import Category from 'components/Category';
import Categorys from 'components/Categorys';
import Live from 'components/Screen';
import Hot from 'components/Hot';
import Wiki from 'components/pageWiki';
import FourOhFour from 'components/FourOhFour';
import CategoryItem from 'components/CategoryItem';
import { getMetadata, getCategory } from 'actions';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
store.dispatch(getCategory());

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Category} />
        <Route path="categorys" component={Category} />
        <Route path="categorys/:name" component={Categorys} />
        <Route path="hot" component={Hot} />
        <Route path="live" component={Live} />
        <Route path="*" component={FourOhFour} />
      </Route>
    </Router>
  </Provider>
);

const checkStatus = (nextState, replace, next) => {
 
        next()
      
}

const checkFetchStatus = (nextState, replace, next) => {
  if(store.getState().categorys.loading) return;
  next();
}
