import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { PersistGate } from 'redux-persist/integration/react';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as _redux from './store/axiosRedux';
import { store, persister } from './store';

// ** Setup Axios
_redux.setupAxios(axios, store)

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider>
            <PersistGate loading={null} persistor={persister}>
                <App />
            </PersistGate>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
