import React, { useDispatch } from "react-redux";
import { Modal } from "../../../../shared/components/modal/modal";
import { useNavigate } from "react-router-dom";
import { CLEAR_INGREDIENT_DETAILS } from "../../../../shared/services/actions/ingredient-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { TODO_ANY } from "../../../../shared/types/types";

export const IngredientDetailsModal = () => {
    const dispatch: TODO_ANY = useDispatch();
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