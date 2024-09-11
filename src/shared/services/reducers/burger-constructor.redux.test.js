import * as actions from '../actions';
import { initialState, burgerConstructorReducer } from './burger-constructor';

describe('redux test', () => {
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

    test('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
    })

    test('should add ingredient', () => {
        expect(burgerConstructorReducer(undefined, {
            type: actions.burgerConstructorActions.ADD_INGREDIENT_BURGER_CONSTRUCTOR,
            payload: { ingredient: data }
        })).toEqual({
            bun: data,
            fillings: []
        })
    })

    test('should delete ingredient', () => {
        expect(burgerConstructorReducer(undefined, {
            type: actions.burgerConstructorActions.DELETE_INGREDIENT_BURGER_CONSTRUCTOR,
            id: '643d69a5c3f7b9001cfa093c'
        })).toEqual({
            bun: null,
            fillings: []
        })
    })
})