import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from './src/components/Router';
import store from '../src/store';

const app = express();

// 596957
// 600232

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>RUARUA.LIVE - 全球直播聚合平台</title>
            <meta name="description" content="全球直播聚合平台">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="explanation" content="Microsoft browsers require custom 404 pages to be at least 512 bytes in length.">
            <link rel="icon" type="image/png" href="/assets/logo-text.png">
        </head>
        <body>
            <div id="app">
                ${html}
            </div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
            <script src="/build/vendor.js"></script>
            <script src="/build/main.js"></script>
        </body>
    </html>
  `;
}

app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {

    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
        
      const state = store.getState();

      Promise.all([
        store.dispatch(getMetadata()),
        store.dispatch(getCategory()),
      ])
      .then(() => {
        const html = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        );
        res.end(renderFullPage(html, store.getState()));
      });
    } else {
      res.status(404).end('Not found');
    }
  });
});

app.listen(8080)