import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
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
        // console.log(
        //     feedOrderDetailsReducer(undefined, {
        //         type: actions.feedOrderDetailsActions.GET_FEED_ORDER_DETAILS_SUCCESS,
        //         data: {
        //             success: true,
        //             orders: [order]
        //         }
        //     })

        // )
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

    // test('should increase ingredient counter', () => {
    //     expect(feedOrderDetailsReducer(undefined, {
    //         type: actions.feedOrderDetailsActions.INCREASE_INGREDIENT_COUNTER,
    //         ingredient: { ingredient: ingredient }
    //     })).toEqual({
    //         ingredients: [
    //             {
    //                 "calories": 0,
    //                 "carbohydrates": 0,
    //                 "fat": 0,
    //                 "image": "",
    //                 "image_large": "",
    //                 "image_mobile": "",
    //                 "name": "",
    //                 "price": 0,
    //                 "proteins": 0,
    //                 "type": "",
    //                 "__v": 1,
    //                 "_id": ""
    //             }
    //         ],
    //         ingredientsRequest: false,
    //         ingredientsFailed: false,
    //         isLoading: false
    //     })
    // })

    // test('should decrease ingredient counter', () => {
    //     expect(feedOrderDetailsReducer(undefined, {
    //         type: actions.feedOrderDetailsActions.DECREASE_INGREDIENT_COUNTER,
    //         ingredient: ingredient
    //     })).toEqual({
    //         ingredients: [
    //             {
    //                 "calories": 0,
    //                 "carbohydrates": 0,
    //                 "fat": 0,
    //                 "image": "",
    //                 "image_large": "",
    //                 "image_mobile": "",
    //                 "name": "",
    //                 "price": 0,
    //                 "proteins": 0,
    //                 "type": "",
    //                 "__v": -1,
    //                 "_id": ""
    //             }
    //         ],
    //         ingredientsRequest: false,
    //         ingredientsFailed: false,
    //         isLoading: false
    //     })
    // })


})