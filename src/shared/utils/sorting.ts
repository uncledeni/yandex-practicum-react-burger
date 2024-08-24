interface IOrderIngredientsSort {
    value: string,
    count: number
}

export const orderIngredientsSort = (arr: string[]): IOrderIngredientsSort[]=> {
    let map = Object.create(null);
    for (let x of arr) (map[x] = map[x] || []).push(x);

    let res = [];
    for (let k of Object.keys(map)) res.push({ value: k, count: map[k].length });
    return res;
}