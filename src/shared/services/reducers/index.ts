import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";
import { authReducer } from "./auth";
import { wsFeedReducer } from './ws-feed-reducer';
import { wsProfileFeedReducer } from './ws-profile-feed-reducer';
import { feedOrderDetailsReducer } from "./feed-order-details";

export const rootReducer = combineReducers({
    ingredients: burgerIngredientsReducer,
    ingredientsDetails: ingredientDetailsReducer,
    order: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    feed: wsFeedReducer,
    profileFeed: wsProfileFeedReducer,
    feedOrderDetails: feedOrderDetailsReducer
});

export type RootState = ReturnType<typeof rootReducer>