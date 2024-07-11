import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    ingredientsDetails: ingredientDetailsReducer,
    order: burgerConstructorReducer,
    orderDetails: orderDetailsReducer
});