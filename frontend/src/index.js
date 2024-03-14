import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './app.tsx';
import {store} from './store/store.ts';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
