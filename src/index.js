import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';
import * as serviceWorker from './serviceWorker';
import Define from './constants/Define';

import 'antd/dist/antd.css';

Axios.defaults.baseURL = Define.host;

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
