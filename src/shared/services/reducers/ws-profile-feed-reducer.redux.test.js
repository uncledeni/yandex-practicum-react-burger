import * as actions from '../actions';
import { initialState, wsProfileFeedReducer } from './ws-profile-feed-reducer';

describe('redux test', () => {
    test('should return initial state', () => {
        expect(wsProfileFeedReducer(undefined, {})).toEqual(initialState);
    })

    test('should start WS connection', () => {
        expect(wsProfileFeedReducer(undefined, { type: actions.wsProfileActions.wsConnecting })).toEqual({
            status: 'CONNECTING...',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: ''
        })
    })

    test('should open WS connection', () => {
        expect(wsProfileFeedReducer(undefined, { type: actions.wsProfileActions.wsOpen })).toEqual({
            status: 'ONLINE',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: ''
        })
    })

    test('should close WS connection', () => {
        expect(wsProfileFeedReducer(undefined, { type: actions.wsProfileActions.wsClose })).toEqual({
            status: 'OFFLINE',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: ''
        })
    })

    test('should failed with error', () => {
        expect(wsProfileFeedReducer(undefined, { type: actions.wsProfileActions.wsError })).toEqual({
            status: 'OFFLINE',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: undefined
        })
    })

    test('should send and receive message', () => {
        expect(wsProfileFeedReducer(undefined, { type: actions.wsProfileActions.wsMessage })).toEqual({
            status: 'OFFLINE',
            data: undefined,
            error: ''
        })
    })
})