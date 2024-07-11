import {
    ADD_INGREDIENT_BURGER_CONSTRUCTOR,
    DELETE_INGREDIENT_BURGER_CONSTRUCTOR,
    SWAP_INGREDIENTS
} from "../actions/burger-constructor";

const initialState = {
    bun: null,
    fillings: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_BURGER_CONSTRUCTOR: {
            return {
                ...state,
                fillings:
                    (action.payload.ingredient.type !== 'bun')
                        ?
                        [...state.fillings, action.payload]
                        :
                        state.fillings,
                bun:
                    (action.payload.ingredient.type === 'bun')
                        ?
                        action.payload.ingredient
                        :
                        state.bun,
            }
        }
        case DELETE_INGREDIENT_BURGER_CONSTRUCTOR: {
            return {
                ...state,
                fillings:
                    [...state.fillings].filter(ingredient => ingredient.id !== action.id)
            }
        }
        case SWAP_INGREDIENTS: {
            const ingredients = [...state.fillings];
            ingredients.splice(action.dragIndex, 0, ingredients.splice(action.hoverIndex, 1)[0]);

            return {
                ...state,
                fillings: ingredients
            }
        }
        default: {
            return state;
        }
    }
}