import { IOrder } from "../types/types";
import { checkEmptyArr } from "./checks";

export const calcTotal = (data: IOrder): number => {
    let price = (checkEmptyArr(data.fillings)) ? (data.fillings.reduce((sum, current) => sum + current.ingredient.price, 0)) : 0;
    return price += (data.bun !== null) ? (data.bun.price * 2) : 0;
}