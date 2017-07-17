import React from 'react';
import { render } from 'react-dom';
import RouterWithProvider from 'components/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Import global CSS

injectTapEventPlugin();
const reactElement = document.getElementById('app');
render(<RouterWithProvider />, reactElement);

