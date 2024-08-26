import { postOrder } from "../../api/get-data-service";
import { AppThunk } from "../../types/action-types";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export function getOrderDetails(data: string | undefined): AppThunk {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
        });
        postOrder(data).then(res => {
            try {
                dispatch({
                    type: GET_ORDER_DETAILS_SUCCESS,
                    order: res
                });
            } catch (err) {
                alert(err);
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED
                });
            }
        });
    }
}