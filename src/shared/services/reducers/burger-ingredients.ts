import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
    DECREASE_BUN_COUNTER
} from "../actions/burger-ingredients";

import { IIngredient } from "../../types/types";
import { AppActions } from "../../types/action-types";

interface IInitialState {
    ingredients: IIngredient[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    isLoading: boolean
}

export const initialState: IInitialState = {
    ingredients: [
        {
            calories: 0,
            carbohydrates: 0,
            fat: 0,
            image: '',
            image_large: '',
            image_mobile: '',
            name: '',
            price: 0,
            proteins: 0,
            type: '',
            __v: 0,
            _id: ''
        }
    ],
    ingredientsRequest: false,
    ingredientsFailed: false,
    isLoading: false
}

export const burgerIngredientsReducer = (state = initialState, action: AppActions) => {
    switch (action.type) {
        case GET_BURGER_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                isLoading: true
            };
        }
        case GET_BURGER_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
                isLoading: false
            }
        }
        case GET_BURGER_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                isLoading: false
            }
        }
        case INCREASE_INGREDIENT_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(ingredient => (ingredient._id === action.ingredient.ingredient._id) ? { ...ingredient, __v: ingredient.__v + 1 } : ingredient)
            }
        }
        case DECREASE_INGREDIENT_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(ingredient => (ingredient._id === action.ingredient._id) ? { ...ingredient, __v: ingredient.__v - 1 } : ingredient)
            }
        }
        case DECREASE_BUN_COUNTER: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(ingredient => (ingredient._id === action.bun._id) ? { ...ingredient, __v: ingredient.__v - 1 } : ingredient)
            }
        }
        default: {
            return state;
        }
    }
}