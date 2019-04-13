import './styles.scss';
import React from 'react';
import App from './components/app/app';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();
