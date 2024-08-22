import React, { useDispatch } from "react-redux";
import { Modal } from "../../../../../shared/components/modal/modal";
import { useNavigate } from "react-router-dom";
import { CLEAR_FEED_ORDER_DETAILS } from "../../../../../shared/services/actions/feed-order-details";
import { FeedOrderDetails } from "../order-feed-details/order-feed-details";
import { TODO_ANY } from "../../../../../shared/types/types";

export const FeedOrderDetailsModal = () => {
    const dispatch: TODO_ANY = useDispatch();
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