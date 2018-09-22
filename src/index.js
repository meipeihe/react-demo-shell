import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './common/stylus/index.styl'


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
