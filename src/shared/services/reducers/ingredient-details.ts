import { AppActions } from "../../types/action-types";
import {
    GET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from "../actions/ingredient-details";

export const initialState = {
    details: {
        image_large: '',
        name: '',
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0
    }
}

export const ingredientDetailsReducer = ( state = initialState, action: AppActions) => {
    switch (action.type) {
        case GET_INGREDIENT_DETAILS: {
            return {
                ...state,
                details: {
                    image_large: action.details.image_large,
                    name: action.details.name,
                    calories: action.details.calories,
                    proteins: action.details.proteins,
                    fat: action.details.fat,
                    carbohydrates: action.details.carbohydrates,
                }
            };
        }
        case CLEAR_INGREDIENT_DETAILS: {
            return {
                ...state,
                details: initialState.details
            }
        }
        default: {
            return state;
        }
    }
}