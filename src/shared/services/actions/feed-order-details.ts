import { getOrder } from "../../api/get-data-service";
import { AppThunk } from "../../types/action-types";

export const GET_FEED_ORDER_DETAILS = 'GET_FEED_ORDER_DETAILS';
export const CLEAR_FEED_ORDER_DETAILS = 'CLEAR_FEED_ORDER_DETAILS';

export const GET_FEED_ORDER_DETAILS_REQUEST = 'GET_FEED_ORDER_DETAILS_REQUEST';
export const GET_FEED_ORDER_DETAILS_SUCCESS = 'GET_FEED_ORDER_DETAILS_SUCCESS';
export const GET_FEED_ORDER_DETAILS_FAILED = 'GET_FEED_ORDER_DETAILS_FAILED';

export function getFeedOrderDetails(_id: string | undefined): AppThunk {
    return function (dispatch) {
        dispatch({
            type: GET_FEED_ORDER_DETAILS_REQUEST
        });
        getOrder(_id).then(res => {
            try {
                console.log(res)
                // @ts-ignore
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