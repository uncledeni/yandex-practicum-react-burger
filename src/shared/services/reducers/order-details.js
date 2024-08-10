import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED,
    CLEAR_ORDER_DETAILS
} from "../actions/order-details";

const initialState = {
    order: {},
    orderRequest: false,
    orderFailed: false,
    isLoading: false
}

export const orderDetailsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                isLoading: true
            };
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                order: action,
                orderRequest: false,
                orderFailed: false,
                isLoading: false
            }
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                isLoading: false
            }
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ...state,
                order: {},
                orderRequest: false,
                orderFailed: false,
                isLoading: false
            }
        }
        default: {
            return state;
        }
    }
}