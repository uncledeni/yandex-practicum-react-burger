import * as actions from '../actions';
import { initialState, feedOrderDetailsReducer } from './feed-order-details';

describe('redux test', () => {
    const order = {
        _id: "66dafb7b119d45001b5049ec",
        ingredients: ['a', 'b', 'c'],
        owner: "66d815f2119d45001b50400c",
        status: "done",
        name: "Флюоресцентный люминесцентный бургер",
        createdAt: "2024-09-06T12:54:19.465Z",
        updatedAt: "2024-09-06T12:54:20.014Z",
        number: 52131,
        __v: 0
    }

    test('should return initial state', () => {
        expect(feedOrderDetailsReducer(undefined, {})).toEqual(initialState);
    })

    test('should return failed', () => {
        expect(feedOrderDetailsReducer(undefined, { type: actions.feedOrderDetailsActions.GET_FEED_ORDER_DETAILS_FAILED })).toEqual({
            details: {
                _id: '',
                number: 0,
                name: '',
                status: '',
                createdAt: '',
                updatedAt: '',
                ingredients: []
            }, orderRequest: false, orderFailed: true
        })
    })

    test('should complete successfully', () => {
        expect(feedOrderDetailsReducer(undefined, {
            type: actions.feedOrderDetailsActions.GET_FEED_ORDER_DETAILS_SUCCESS,
            data: {
                success: true,
                orders: [order]
            }
        })).toEqual({
            details: order,
            orderRequest: false,
            orderFailed: false,
        })
    })

    test('should increase ingredient counter', () => {
        expect(feedOrderDetailsReducer(undefined, {
            type: actions.feedOrderDetailsActions.GET_FEED_ORDER_DETAILS,
            details: {
                _id: "66dafb7b119d45001b5049ec",
                ingredients: ['a', 'b', 'c'],
                status: "done",
                name: "Флюоресцентный люминесцентный бургер",
                createdAt: "2024-09-06T12:54:19.465Z",
                updatedAt: "2024-09-06T12:54:20.014Z",
                number: 52131,
            }
        })).toEqual({
            details: {
                _id: "66dafb7b119d45001b5049ec",
                ingredients: ['a', 'b', 'c'],
                status: "done",
                name: "Флюоресцентный люминесцентный бургер",
                createdAt: "2024-09-06T12:54:19.465Z",
                updatedAt: "2024-09-06T12:54:20.014Z",
                number: 52131,
            },
            orderRequest: false,
            orderFailed: false
        })
    })

    test('should decrease ingredient counter', () => {
        expect(feedOrderDetailsReducer(undefined, {
            type: actions.feedOrderDetailsActions.CLEAR_FEED_ORDER_DETAILS
        })).toEqual({
            details: {
                _id: "",
                number: 0,
                name: "",
                status: "",
                createdAt: "",
                updatedAt: "",
                ingredients: [],
            },
            orderRequest: false,
            orderFailed: false
        })
    })
})