import { getDataService } from "../../api/get-data-service";
import { AppThunk } from "../../types/action-types";

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER';
export const DECREASE_INGREDIENT_COUNTER = 'DECREASE_INGREDIENT_COUNTER';
export const DECREASE_BUN_COUNTER = 'DECREASE_BUN_COUNTER';

export const getBurgerIngredients = (): AppThunk => {
    return function (dispatch) {
        dispatch({
            type: GET_BURGER_INGREDIENTS_REQUEST
        });
        getDataService().then(res => {
            console.log(res)
            try {
                dispatch({
                    type: GET_BURGER_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } 
            catch (err) {
                alert(err)
                dispatch({
                    type: GET_BURGER_INGREDIENTS_FAILED
                });
            }
        });
    }
}