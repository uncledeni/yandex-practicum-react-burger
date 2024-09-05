import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import * as actions from '../actions';
import { initialState, orderDetailsReducer } from './order-details';

describe('redux test', () => {

    test('r1', async () => {
        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);
        const store = mockStore({ data: null });

        const expectedActions = [
            { type: actions.GET_ORDER_DETAILS_REQUEST },
            { type: actions.GET_ORDER_DETAILS_SUCCESS, order: '' },
            { type: actions.GET_ORDER_DETAILS_FAILED }
        ]

        const temp = store.dispatch(actions.getOrderDetails(
            ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa093d"]))
        // .then(() => {
        //     expect(store.getActions()).toEqual(expectedActions)
        // })

        // console.log(temp);
        // return temp;
    })

    test('should return initial state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
    })

    test('should return failed', () => {
        console.log(orderDetailsReducer(undefined, { type: actions.GET_ORDER_DETAILS_FAILED }))
        expect(orderDetailsReducer(undefined, { type: actions.GET_ORDER_DETAILS_FAILED })).toEqual(
            { order: {}, orderRequest: false, orderFailed: true, isLoading: false }
        )
    })

    test('should complete successfully', () => {

        const tempOrder = {
            "success": true,
            "name": "Флюоресцентный люминесцентный бургер",
            "_id": "66da1940119d45001b504811",
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2024-09-05T20:49:04.841Z",
            "updatedAt": "2024-09-05T20:49:05.370Z",
            "number": 52029,
            "price": 2964
        }

        expect(orderDetailsReducer(undefined, {
            type: actions.GET_ORDER_DETAILS_SUCCESS,
            order: tempOrder
        })).toEqual(
            {
                order: {
                    type: 'GET_ORDER_DETAILS_SUCCESS',
                    order: tempOrder
                },
                orderRequest: false,
                orderFailed: false,
                isLoading: false
            }
        )
    })
})