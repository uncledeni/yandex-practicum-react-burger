import { AppActions } from '../../types/action-types';
import {
    GET_FEED_ORDER_DETAILS,
    CLEAR_FEED_ORDER_DETAILS,
    GET_FEED_ORDER_DETAILS_REQUEST,
    GET_FEED_ORDER_DETAILS_SUCCESS,
    GET_FEED_ORDER_DETAILS_FAILED
} from '../actions/feed-order-details';

export const initialState = {
    details: {
        _id: '',
        number: 0,
        name: '',
        status: '',
        createdAt: '',
        updatedAt: '',
        ingredients: []
    },
    orderRequest: false,
    orderFailed: false,
}

export const feedOrderDetailsReducer = (state = initialState, action: AppActions) => {
    switch (action.type) {
        case GET_FEED_ORDER_DETAILS: {
            return {
                ...state,
                details: action.details
            };
        }
        case CLEAR_FEED_ORDER_DETAILS: {
            return {
                ...state,
                details: initialState.details
            }
        }
        case GET_FEED_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                isLoading: true
            };
        }
        case GET_FEED_ORDER_DETAILS_SUCCESS: {
            console.log(action)
            return {
                ...state,
                details: action.data.orders[0],
                orderRequest: false,
                orderFailed: false
            }
        }
        case GET_FEED_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        default: {
            return state;
        }
    }
}