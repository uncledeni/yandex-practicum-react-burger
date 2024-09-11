import * as actions from '../actions';
import { initialState, burgerIngredientsReducer } from './burger-ingredients';

describe('redux test', () => {

    const ingredient = {
        "calories": 0,
        "carbohydrates": 0,
        "fat": 0,
        "image": "",
        "image_large": "",
        "image_mobile": "",
        "name": "",
        "price": 0,
        "proteins": 0,
        "type": "",
        "__v": 0,
        "_id": ""
    }

    test('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
    })

    test('should return failed', () => {
        expect(burgerIngredientsReducer(undefined, { type: actions.burgerIngredientsActions.GET_BURGER_INGREDIENTS_FAILED })).toEqual({
            ingredients: [ingredient], ingredientsRequest: false, ingredientsFailed: true, isLoading: false
        })
    })

    test('should complete successfully', () => {
        expect(burgerIngredientsReducer(undefined, {
            type: actions.burgerIngredientsActions.GET_BURGER_INGREDIENTS_SUCCESS,
            ingredients: [ingredient]
        })).toEqual({
            ingredients: [ingredient],
            ingredientsRequest: false,
            ingredientsFailed: false,
            isLoading: false
        })
    })

    test('should increase ingredient counter', () => {
        expect(burgerIngredientsReducer(undefined, {
            type: actions.burgerIngredientsActions.INCREASE_INGREDIENT_COUNTER,
            ingredient: { ingredient: ingredient }
        })).toEqual({
            ingredients: [
                {
                    "calories": 0,
                    "carbohydrates": 0,
                    "fat": 0,
                    "image": "",
                    "image_large": "",
                    "image_mobile": "",
                    "name": "",
                    "price": 0,
                    "proteins": 0,
                    "type": "",
                    "__v": 1,
                    "_id": ""
                }
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
            isLoading: false
        })
    })

    test('should decrease ingredient counter', () => {
        expect(burgerIngredientsReducer(undefined, {
            type: actions.burgerIngredientsActions.DECREASE_INGREDIENT_COUNTER,
            ingredient: ingredient
        })).toEqual({
            ingredients: [
                {
                    "calories": 0,
                    "carbohydrates": 0,
                    "fat": 0,
                    "image": "",
                    "image_large": "",
                    "image_mobile": "",
                    "name": "",
                    "price": 0,
                    "proteins": 0,
                    "type": "",
                    "__v": -1,
                    "_id": ""
                }
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
            isLoading: false
        })
    })

    test('should decrease bun counter', () => {
        expect(burgerIngredientsReducer(undefined, {
            type: actions.burgerIngredientsActions.DECREASE_BUN_COUNTER,
            bun: ingredient
        })).toEqual({
            ingredients: [
                {
                    "calories": 0,
                    "carbohydrates": 0,
                    "fat": 0,
                    "image": "",
                    "image_large": "",
                    "image_mobile": "",
                    "name": "",
                    "price": 0,
                    "proteins": 0,
                    "type": "",
                    "__v": -1,
                    "_id": ""
                }
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
            isLoading: false
        })
    })
})