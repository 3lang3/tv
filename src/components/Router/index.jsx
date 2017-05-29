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
import Invite from 'components/pageInvite';
import Home from 'components/pageHome';
import About from 'components/pageAbout';
import FourOhFour from 'components/FourOhFour';
import CategoryItem from 'components/CategoryItem';
import { getMetadata } from 'actions';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute onEnter={checkStatus} component={Home} />
        <Route onEnter={checkStatus} path=":category" component={Home}>
          <Route  onEnter={checkFetchStatus} path=":name" component={Home} />
        </Route>
        <Route path="invite" component={Invite} />
        <Route path="about" component={About} />
        <Route path="*" component={FourOhFour} />
      </Route>
    </Router>
  </Provider>
);

const checkStatus = (nextState, replace, next) => {
  var inviteCode = localStorage.getItem('__inviteCode') || null;
      if(inviteCode) {
        next()
      }else {
        replace('/invite?code=testcode');
        next()
      }
}

const checkFetchStatus = (nextState, replace, next) => {
  if(store.getState().categorys.loading) return;
  next();
}
