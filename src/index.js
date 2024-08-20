import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './shared/services/reducers';

import './index.css';
import { socketMiddleware } from './shared/services/middleware/socket-middleware';

import {
  connect as FeedDataWsConnect,
  disconnect as FeedDataWsDisconnect,
  wsConnecting as FeedDataWsConnecting,
  wsOpen as FeedDataWsOpen,
  wsClose as FeedDataWsClose,
  wsError as FeedDataWsError,
} from './shared/services/actions/wsActionTypes';

const wsActions = {
  wsConnect: FeedDataWsConnect,
  wsDisconnect: FeedDataWsDisconnect,
  wsConnecting: FeedDataWsConnecting,
  onOpen: FeedDataWsOpen,
  onClose: FeedDataWsClose,
  onError: FeedDataWsError,
};

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();