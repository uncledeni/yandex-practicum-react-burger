import { IIngredient } from "../types"
import {
    GET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details"

type TGetIngredientDetails = {
    type: typeof GET_INGREDIENT_DETAILS,
    details: IIngredient
}

type TClearIngredientDetails = {
    type: typeof CLEAR_INGREDIENT_DETAILS
}

export type TIngredientDetails = TGetIngredientDetails | TClearIngredientDetails