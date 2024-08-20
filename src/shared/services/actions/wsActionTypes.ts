import { createAction } from "@reduxjs/toolkit";

const FEED_DATA_CONNECT = 'FEED_DATA_CONNECT';

export const connect = createAction<string, typeof FEED_DATA_CONNECT>(FEED_DATA_CONNECT);
export const disconnect = createAction('FEED_DATA_DISCONNECT');
export const wsConnecting = createAction('FEED_DATA_CONNECTING');
export const wsOpen = createAction('FEED_DATA_WS_OPEN');
export const wsClose = createAction('FEED_DATA_WS_CLOSE');
// export const wsMessage = createAction();
export const wsError = createAction('FEED_DATA_WS_ERROR');

export type TFeedDataAction = ReturnType<typeof connect> |
    ReturnType<typeof disconnect> |
    ReturnType<typeof wsConnecting> |
    ReturnType<typeof wsOpen> |
    ReturnType<typeof wsClose> |
    ReturnType<typeof wsError>;