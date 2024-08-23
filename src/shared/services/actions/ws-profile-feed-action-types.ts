import { createAction } from "@reduxjs/toolkit";

const PROFILE_FEED_DATA_CONNECT = 'PROFILE_FEED_DATA_CONNECT';

export const connect = createAction<string, typeof PROFILE_FEED_DATA_CONNECT>(PROFILE_FEED_DATA_CONNECT);
export const disconnect = createAction('PROFILE_FEED_DATA_DISCONNECT');
export const wsConnecting = createAction('PROFILE_FEED_DATA_CONNECTING');
export const wsOpen = createAction('PROFILE_FEED_DATA_WS_OPEN');
export const wsClose = createAction('PROFILE_FEED_DATA_WS_CLOSE');
export const wsMessage = createAction('PROFILE_FEED_DATA_WS_MESSAGE');
export const wsError = createAction('PROFILE_FEED_DATA_WS_ERROR');

export type TFeedDataAction = ReturnType<typeof connect> |
    ReturnType<typeof disconnect> |
    ReturnType<typeof wsConnecting> |
    ReturnType<typeof wsOpen> |
    ReturnType<typeof wsClose> |
    ReturnType<typeof wsMessage> |
    ReturnType<typeof wsError>;