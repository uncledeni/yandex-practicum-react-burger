import React from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../../../shared/components/modal/modal";
import { CLEAR_INGREDIENT_DETAILS } from "../../../../../shared/services/actions/ingredient-details";
import { IngredientDetails } from "../ingredient-details";
import { useTypedDispatch } from "../../../../../shared/hooks";

export const IngredientDetailsModal = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const clearIngredientDetails = () => {
        dispatch({ type: CLEAR_INGREDIENT_DETAILS })
    }

    const closeAndClear = () => {
        navigate(-1);
        clearIngredientDetails();
    }

    return (
        <Modal handlerOpen={closeAndClear}>
            <IngredientDetails />
        </Modal>
    )
}