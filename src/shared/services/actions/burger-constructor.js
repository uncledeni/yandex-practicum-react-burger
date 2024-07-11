import { v4 as uuid } from 'uuid';

export const ADD_INGREDIENT_BURGER_CONSTRUCTOR = 'ADD_INGREDIENT_BURGER_CONSTRUCTOR';
export const DELETE_INGREDIENT_BURGER_CONSTRUCTOR = 'DELETE_INGREDIENT_BURGER_CONSTRUCTOR';
export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS';

export const addIngredient = (ingredient) => {
    return { type: ADD_INGREDIENT_BURGER_CONSTRUCTOR, payload: {...ingredient, id: uuid()} }
}