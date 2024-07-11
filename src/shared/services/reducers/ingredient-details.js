import {
    GET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from "../actions/ingredient-details";

const initialState = {
    details: {
        image_large: '',
        name: '',
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0
    }
}

export const ingredientDetailsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENT_DETAILS: {
            return {
                ...state,
                details: action.details
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