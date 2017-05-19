import React, { Component } from 'react';
import { render } from 'react-dom';
import RouterWithProvider from 'components/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Import global CSS

// TODO this is used by material-ui, but we should remove when possible.
injectTapEventPlugin();
const reactElement = document.getElementById('react');
render(<RouterWithProvider />, reactElement);

