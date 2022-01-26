import * as React from 'react';
import { render } from 'react-dom';

import './index.css';
import Root from './app/Root';

import * as serviceWorker from './serviceWorker';

render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
