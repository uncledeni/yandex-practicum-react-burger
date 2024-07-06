import { getDataService } from "../../api/get-data-service";

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER'; 
export const DECREASE_INGREDIENT_COUNTER = 'DECREASE_INGREDIENT_COUNTER';
export const DECREASE_BUN_COUNTER = 'DECREASE_BUN_COUNTER';

export function getBurgerIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_BURGER_INGREDIENTS_REQUEST
        });
        getDataService().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_BURGER_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: GET_BURGER_INGREDIENTS_FAILED
                });
            }
        });
    }
}