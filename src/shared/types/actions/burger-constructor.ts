import { IBun, IFilling } from "../types"
import {
    ADD_INGREDIENT_BURGER_CONSTRUCTOR,
    DELETE_INGREDIENT_BURGER_CONSTRUCTOR,
    SWAP_INGREDIENTS
} from "../../services/actions/burger-constructor"

type TAddIngredientAction = {
    type: typeof ADD_INGREDIENT_BURGER_CONSTRUCTOR,
    payload: IBun | IFilling
}

type TDeleteIngredientAction = {
    type: typeof DELETE_INGREDIENT_BURGER_CONSTRUCTOR,
    id: string
}

type TSwapIngredientAction = {
    type: typeof SWAP_INGREDIENTS,
    dragIndex: number,
    hoverIndex: number
}

export type TBurgerConstructorActions = TAddIngredientAction | TDeleteIngredientAction | TSwapIngredientAction;