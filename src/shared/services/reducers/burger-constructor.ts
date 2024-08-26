import { AppActions } from "../../types/action-types";
import { IBun, IFilling } from "../../types/types";
import {
    ADD_INGREDIENT_BURGER_CONSTRUCTOR,
    DELETE_INGREDIENT_BURGER_CONSTRUCTOR,
    SWAP_INGREDIENTS
} from "../actions/burger-constructor";

interface IInitialState {
    bun: IBun | null,
    fillings: IFilling[]
}

const initialState: IInitialState = {
    bun: null,
    fillings: []
}

export const burgerConstructorReducer = (state = initialState, action: AppActions) => {
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
            console.log(...state.fillings)
            return {
                ...state,
                fillings:
                    [...state.fillings].filter((ingredient: IFilling) => { console.log(ingredient); return ingredient.id !== action.id})
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