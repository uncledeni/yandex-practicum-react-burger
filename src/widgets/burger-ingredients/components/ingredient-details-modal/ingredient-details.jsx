import { useDispatch } from "react-redux";
import { Modal } from "../../../../shared/components/modal/modal";
import { useNavigate } from "react-router-dom";
import { CLEAR_INGREDIENT_DETAILS } from "../../../../shared/services/actions/ingredient-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const IngredientDetailsModal = (props) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

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