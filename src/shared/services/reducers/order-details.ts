import { AppActions } from "../../types/action-types";
import { IOrderAction } from "../../types/types";
import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED,
    CLEAR_ORDER_DETAILS
} from "../actions/order-details";

export const initialState = {
    order: {} as IOrderAction,
    orderRequest: false,
    orderFailed: false,
    isLoading: false
}

export const orderDetailsReducer = ( state = initialState, action: AppActions) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                isLoading: true
            };
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            console.log(action)
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