import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithoutPayload,
}

export const socketMiddleware = (wsUrl: string, wsActions): Middleware => {
  return ((store: MiddlewareAPI) => {
    console.log(wsActions)
    let socket: WebSocket | null = null;
    const token = localStorage.getItem("accessToken")

    return next => (action) => {
      const { dispatch } = store;
      const { type } = action;
      console.log(action, type)
      const { wsConnect, onOpen, onClose, onError } = wsActions;
      if (wsConnect.match(action)) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
        console.log(socket.readyState);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError(event.type));
        };

        // socket.onmessage = event => {
        //   const { data } = event;
        //   const parsedData = JSON.parse(data);
        //   const { success, ...restParsedData } = parsedData;

        //   dispatch({ type: onMessage, payload: { ...restParsedData } });
        // };

        socket.onclose = event => {
          dispatch(onClose());
        };

        // if (type === wsSendMessage) {
        //   const payload = action.payload;
        // }
      }

      next(action);
    };
  }) as Middleware;

};