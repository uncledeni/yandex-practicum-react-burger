import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
    DECREASE_BUN_COUNTER
} from "../../services/actions/burger-ingredients"
import { IBun, IFilling, IIngredient } from "../types"

type TGetBurgerIngredientsRequest = {
    type: typeof GET_BURGER_INGREDIENTS_REQUEST
}

type TGetBurgerIngredientsSuccess = {
    type: typeof GET_BURGER_INGREDIENTS_SUCCESS,
    ingredients: IIngredient[]
}

type TGetBurgerIngredientsFailed = {
    type: typeof GET_BURGER_INGREDIENTS_FAILED
}

type TIncreaseIngredientCounter = {
    type: typeof INCREASE_INGREDIENT_COUNTER,
    ingredient: IBun | IFilling
}

type TDecreaseIngredientCounter = {
    type: typeof DECREASE_INGREDIENT_COUNTER,
    ingredient: IIngredient
}

type TDecreaseBunCounter = {
    type: typeof DECREASE_BUN_COUNTER,
    bun: IBun
}

export type TBurgerIngredientsActions = TGetBurgerIngredientsRequest
    | TGetBurgerIngredientsSuccess
    | TGetBurgerIngredientsFailed
    | TIncreaseIngredientCounter
    | TDecreaseIngredientCounter
    | TDecreaseBunCounter;