import './styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';
import App from './components/app/app';
import {DOMElement} from 'react';

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();
