import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

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
  wsMessage as FeedDataWsMessage,
  wsError as FeedDataWsError,
} from './shared/services/actions/ws-feed-action-types';

import {
  connect as FeedDataWsConnect2,
  disconnect as FeedDataWsDisconnect2,
  wsConnecting as FeedDataWsConnecting2,
  wsOpen as FeedDataWsOpen2,
  wsClose as FeedDataWsClose2,
  wsMessage as FeedDataWsMessage2,
  wsError as FeedDataWsError2,
} from './shared/services/actions/ws-profile-feed-action-types';

import { configureStore } from '@reduxjs/toolkit';

const wsActions = {
  wsConnect: FeedDataWsConnect,
  wsDisconnect: FeedDataWsDisconnect,
  wsConnecting: FeedDataWsConnecting,
  onOpen: FeedDataWsOpen,
  onClose: FeedDataWsClose,
  onMessage: FeedDataWsMessage,
  onError: FeedDataWsError,
};

const wsActions2 = {
  wsConnect: FeedDataWsConnect2,
  wsDisconnect: FeedDataWsDisconnect2,
  wsConnecting: FeedDataWsConnecting2,
  onOpen: FeedDataWsOpen2,
  onClose: FeedDataWsClose2,
  onMessage: FeedDataWsMessage2,
  onError: FeedDataWsError2,
};

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
const middleware = socketMiddleware(wsActions)
const middleware2 = socketMiddleware(wsActions2)

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk, middleware, middleware2)
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();