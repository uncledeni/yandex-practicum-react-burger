import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onMessage: ActionCreatorWithPayload<any>,
  onError: ActionCreatorWithPayload<string>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return ((store: MiddlewareAPI) => {
    // console.log(wsActions)
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const { wsConnect, onOpen, onClose, onError, wsConnecting, onMessage, wsDisconnect } = wsActions;
      if (wsConnect.match(action)) {
        const wsUrl = action.payload;
        socket = new WebSocket(wsUrl);
        dispatch(wsConnecting())
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError(event.type));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          dispatch(onClose());
        };

        if (wsDisconnect.match(action)) {
          socket.close()
        }
      }

      next(action);
    };
  }) as Middleware;

};