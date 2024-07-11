import { postOrder } from "../../api/get-data-service";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export function getOrderDetails(data) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
        });
        try {
            postOrder(data).then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_DETAILS_SUCCESS,
                        order: res
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_DETAILS_FAILED
                    });
                }
            });
        } catch (err) {
            alert (err);
        }
    }
}