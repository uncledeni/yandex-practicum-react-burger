import { error } from 'console';
import { WebSocketStatus } from '../../types/types';
import { wsOpen, wsError, wsConnecting, wsMessage, wsClose } from '../actions/ws-feed-action-types';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  status: WebSocketStatus.OFFLINE,
  data: {},
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
    state.data = {};
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