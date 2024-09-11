import * as actions from '../actions';
import { initialState, ingredientDetailsReducer } from './ingredient-details';

describe('redux test', () => {

    test('should return initial state', () => {
        expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
    })

    test('should get ingredients details', () => {
        const data = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        };

        expect(ingredientDetailsReducer(undefined, {
            type: actions.ingredientDetailsActions.GET_INGREDIENT_DETAILS,
            details: data
        })).toEqual({
            details: {
                image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
                name: 'Краторная булка N-200i',
                calories: 420,
                proteins: 80,
                fat: 24,
                carbohydrates: 53
            }
        })
    })

    test('should clear ingredients details', () => {
        expect(ingredientDetailsReducer(undefined, { type: actions.ingredientDetailsActions.CLEAR_INGREDIENT_DETAILS })).toEqual({
            details: {
                image_large: '',
                name: '',
                calories: 0,
                proteins: 0,
                fat: 0,
                carbohydrates: 0
            },
        })
    })
})