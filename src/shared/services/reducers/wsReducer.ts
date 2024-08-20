import { error } from 'console';
import { WebSocketStatus } from '../../types/types';
import { wsOpen, wsError, wsConnecting } from '../actions/wsActionTypes';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  status: WebSocketStatus.OFFLINE,
  data: [],
  error: ''
};

export const wsReducer = createReducer(initialState, (builder) => {
  builder.addCase(wsConnecting, (state) => {
    state.status = WebSocketStatus.CONNECTING;
  })
  builder.addCase(wsOpen, (state) => {
    state.status = WebSocketStatus.ONLINE;
    state.error = '';
  })
  builder.addCase(wsError, (state, action) => {
    state.status = WebSocketStatus.OFFLINE;
    state.error = action.payload;
  })
})