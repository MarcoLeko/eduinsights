import './styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';
import App from './components/app/app';

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.register();
