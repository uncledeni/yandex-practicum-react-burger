import { createAction } from "@reduxjs/toolkit";
import { IWSActionPayload } from "../../types/types";

const FEED_DATA_CONNECT = 'FEED_DATA_CONNECT';

export const connect = createAction<string, typeof FEED_DATA_CONNECT>(FEED_DATA_CONNECT);
export const disconnect = createAction('FEED_DATA_DISCONNECT');
export const wsConnecting = createAction('FEED_DATA_CONNECTING');
export const wsOpen = createAction('FEED_DATA_WS_OPEN');
export const wsClose = createAction('FEED_DATA_WS_CLOSE');
export const wsMessage = createAction<IWSActionPayload, 'FEED_DATA_WS_MESSAGE'>('FEED_DATA_WS_MESSAGE');
export const wsError = createAction<string, 'FEED_DATA_WS_ERROR'>('FEED_DATA_WS_ERROR');

export type TFeedDataAction = ReturnType<typeof connect> |
    ReturnType<typeof disconnect> |
    ReturnType<typeof wsConnecting> |
    ReturnType<typeof wsOpen> |
    ReturnType<typeof wsClose> |
    ReturnType<typeof wsMessage> |
    ReturnType<typeof wsError>;