import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Pages from './pages';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Pages />, document.getElementById('root'));
serviceWorker.unregister();
