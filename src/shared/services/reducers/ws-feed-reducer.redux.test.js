import * as actions from '../actions';
import { initialState, wsFeedReducer } from './ws-feed-reducer';

describe('redux test', () => {
    test('should return initial state', () => {
        expect(wsFeedReducer(undefined, {})).toEqual(initialState);
    })

    test('should start WS connection', () => {
        // console.log(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsConnecting }))

        expect(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsConnecting })).toEqual({
            status: 'CONNECTING...',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: ''
        })
    })

    test('should open WS connection', () => {
        // console.log(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsOpen }))

        expect(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsOpen })).toEqual({
            status: 'ONLINE',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: ''
        })
    })

    test('should close WS connection', () => {
        // console.log(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsClose }))

        expect(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsClose })).toEqual({
            status: 'OFFLINE',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: ''
        })
    })

    test('should failed with error', () => {
        // console.log(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsError }))

        expect(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsError })).toEqual({
            status: 'OFFLINE',
            data: { orders: [], success: false, total: 0, totalToday: 0 },
            error: undefined
        })
    })

    test('should send and receive message', () => {
        // console.log(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsMessage }))

        expect(wsFeedReducer(undefined, { type: actions.wsFeedActions.wsMessage })).toEqual({
            status: 'OFFLINE',
            data: undefined,
            error: ''
        })
    })
})