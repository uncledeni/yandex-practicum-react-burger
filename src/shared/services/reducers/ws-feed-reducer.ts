import { wsOpen, wsError, wsConnecting, wsMessage, wsClose } from '../actions/ws-feed-action-types';
import { WebSocketStatus, IWSFeedReducer } from '../../types/types';
import { createReducer } from '@reduxjs/toolkit';

const initialState: IWSFeedReducer = {
  status: WebSocketStatus.OFFLINE,
  data: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
  },
  error: ''
};

export const wsFeedReducer = createReducer(initialState, (builder) => {
  builder.addCase(wsConnecting, (state) => {
    state.status = WebSocketStatus.CONNECTING;
  })
  builder.addCase(wsOpen, (state) => {
    state.status = WebSocketStatus.ONLINE;
    state.error = '';
  })
  builder.addCase(wsClose, (state) => {
    state.status = WebSocketStatus.OFFLINE;
    state.data = initialState.data;
    state.error = '';
  })
  builder.addCase(wsError, (state, action) => {
    state.status = WebSocketStatus.OFFLINE;
    state.error = action.payload;
  })
  builder.addCase(wsMessage, (state, action) => {
    state.data = action.payload;
  })
})