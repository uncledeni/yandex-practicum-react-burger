import React from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../shared/components/modal/modal";
import { CLEAR_FEED_ORDER_DETAILS } from "../../../shared/services/actions/feed-order-details";
import { FeedOrderDetails } from "../feed-order-details";
import { useTypedDispatch } from "../../../shared/hooks";

export const FeedOrderDetailsModal = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const clearIngredientDetails = () => {
        dispatch({ type: CLEAR_FEED_ORDER_DETAILS })
    }

    const closeAndClear = () => {
        navigate(-1);
        clearIngredientDetails();
    }

    return (
        <Modal handlerOpen={closeAndClear}>
            <FeedOrderDetails />
        </Modal>
    )
}