import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../services/reducers";
import {
    TFeedOrderDetails,
    TBurgerConstructorActions,
    TIngredientDetails,
    TBurgerIngredientsActions,
    TOrderDetails,
    TAuth
} from "./actions";
import { TFeedDataAction } from "../services/actions/ws-feed-action-types";
import { TProfileFeedDataAction } from "../services/actions/ws-profile-feed-action-types";

export type AppActions = TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TIngredientDetails
    | TFeedOrderDetails
    | TOrderDetails
    | TAuth
    | TFeedDataAction
    | TProfileFeedDataAction;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type AppDispatch<TReturnType = void> = (
    action: AppActions | AppThunk<TReturnType>
) => TReturnType;