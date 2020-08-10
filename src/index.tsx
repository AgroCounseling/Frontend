import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./state/root-reducer";
import App from './App';
import { Provider } from 'react-redux';
import i18n from "./i18n/index";
import { I18nextProvider } from 'react-i18next';
ReactDOM.render(
    <I18nextProvider i18n={i18n}><React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode></I18nextProvider>
    ,
    document.getElementById('root')
)
