export const GET_FEED_ORDER_DETAILS = 'GET_FEED_ORDER_DETAILS';
export const CLEAR_FEED_ORDER_DETAILS = 'CLEAR_FEED_ORDER_DETAILS';

export const GET_FEED_ORDER_DETAILS_REQUEST = 'GET_FEED_ORDER_DETAILS_REQUEST';
export const GET_FEED_ORDER_DETAILS_SUCCESS = 'GET_FEED_ORDER_DETAILS_SUCCESS';
export const GET_FEED_ORDER_DETAILS_FAILED = 'GET_FEED_ORDER_DETAILS_FAILED';

import { getOrder } from "../../api/get-data-service";

export function getFeedOrderDetails(number) {
    return function (dispatch) {
        dispatch({
            type: GET_FEED_ORDER_DETAILS_REQUEST
        });
        getOrder(number).then(res => {
            try {
                dispatch({
                    type: GET_FEED_ORDER_DETAILS_SUCCESS,
                    data: res
                });
            } catch (err) {
                alert(err);
                dispatch({
                    type: GET_FEED_ORDER_DETAILS_FAILED
                });
            }
        });
    }
}