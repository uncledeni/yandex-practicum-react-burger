import { IIngredient, IOrder } from "../types/types";
import { checkEmptyArr } from "./checks";

export const calcTotal = (data: IOrder): number => {
    let price = (checkEmptyArr(data.fillings)) ? (data.fillings.reduce((sum, current) => sum + current.ingredient.price, 0)) : 0;
    // @ts-ignore
    return price += (data.bun !== null) ? (data.bun.price * 2) : 0;
}

export const feedOrderCalcTotal = (arr: string[], ingredients: IIngredient[]): number => {
    // @ts-ignore
    const total = arr.reduce((sum, current) => sum + (ingredients.find(i => { return i._id === current; })).price, 0);
    return total;
}