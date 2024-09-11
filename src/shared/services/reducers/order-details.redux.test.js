import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import * as actions from '../actions';
import { initialState, orderDetailsReducer } from './order-details';

describe('redux test', () => {

    // test('r1', async () => {
    //     const middleware = [thunk];
    //     const mockStore = configureMockStore(middleware);
    //     const store = mockStore({ data: null });

    //     const expectedActions = [
    //         { type: actions.orderDetailsActions.GET_ORDER_DETAILS_REQUEST },
    //         { type: actions.orderDetailsActions.GET_ORDER_DETAILS_SUCCESS, order: '' },
    //         { type: actions.orderDetailsActions.GET_ORDER_DETAILS_FAILED }
    //     ]

    //     const temp = store.dispatch(actions.orderDetailsActions.getOrderDetails(
    //         ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa093d"]))
    //     // .then(() => {
    //     //     expect(store.getActions()).toEqual(expectedActions)
    //     // })

    //     console.log(store.dispatch({ type: actions.orderDetailsActions }));
    //     // return temp;
    // })

    test('should return initial state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
    })

    test('should return failed', () => {
        expect(orderDetailsReducer(undefined, { type: actions.orderDetailsActions.GET_ORDER_DETAILS_FAILED })).toEqual({
            order: {}, orderRequest: false, orderFailed: true, isLoading: false
        })
    })

    test('should complete successfully', () => {
        const tempOrder = { "success": true };

        expect(orderDetailsReducer(undefined, {
            type: actions.orderDetailsActions.GET_ORDER_DETAILS_SUCCESS,
            order: tempOrder
        })).toEqual({
            order: { type: 'GET_ORDER_DETAILS_SUCCESS', order: tempOrder },
            orderRequest: false,
            orderFailed: false,
            isLoading: false
        })
    })

    test('should clear order details', () => {
        expect(orderDetailsReducer(undefined, { type: actions.orderDetailsActions.CLEAR_ORDER_DETAILS })).toEqual({
            order: {},
            orderRequest: false,
            orderFailed: false,
            isLoading: false
        })
    })
})