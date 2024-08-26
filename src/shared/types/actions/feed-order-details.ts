import { IFeedOrder, IOrderData } from "../types"
import {
    GET_FEED_ORDER_DETAILS,
    CLEAR_FEED_ORDER_DETAILS,
    GET_FEED_ORDER_DETAILS_REQUEST,
    GET_FEED_ORDER_DETAILS_SUCCESS,
    GET_FEED_ORDER_DETAILS_FAILED
} from "../../services/actions/feed-order-details"

type TGetFeedOrderDetailsRequest = {
    type: typeof GET_FEED_ORDER_DETAILS_REQUEST
}

type TGetFeedOrderDetailsSuccess = {
    type: typeof GET_FEED_ORDER_DETAILS_SUCCESS,
    data: {
        success: boolean,
        orders: IOrderData[]
    }
}

type TGetFeedOrderDetailsFailed = {
    type: typeof GET_FEED_ORDER_DETAILS_FAILED,
}

type TGetFeedOrderDetails = {
    type: typeof GET_FEED_ORDER_DETAILS,
    details: IFeedOrder
}

type TClearFeedOrderDetails = {
    type: typeof CLEAR_FEED_ORDER_DETAILS
}

export type TFeedOrderDetails = TGetFeedOrderDetailsRequest
    | TGetFeedOrderDetailsSuccess
    | TGetFeedOrderDetailsFailed
    | TGetFeedOrderDetails
    | TClearFeedOrderDetails