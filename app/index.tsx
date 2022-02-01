import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import './app.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;



document.addEventListener('DOMContentLoaded', () => {
  const App = hot(require('./main/App').default);

  ReactDom.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );
});
