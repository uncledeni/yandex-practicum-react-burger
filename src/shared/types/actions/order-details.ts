import { IBun, IOrderData } from "../types"
import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED,
    CLEAR_ORDER_DETAILS
} from "../../services/actions/order-details"

type TGetOrderDetailsRequest = {
    type: typeof GET_ORDER_DETAILS_REQUEST
}

type TGetOrderDetailsSuccess = {
    type: typeof GET_ORDER_DETAILS_SUCCESS,
    order: {
        success: boolean,
        name: string,
        order: IOrderData
    }
}

type TGetOrderDetailsFailed = {
    type: typeof GET_ORDER_DETAILS_FAILED
}

type TClearOrderDetails = {
    type: typeof CLEAR_ORDER_DETAILS
}

export type TOrderDetails = TGetOrderDetailsRequest
    | TGetOrderDetailsSuccess
    | TGetOrderDetailsFailed
    | TClearOrderDetails