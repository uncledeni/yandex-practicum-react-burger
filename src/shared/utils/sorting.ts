export const orderIngredientsSort = (arr) => {
    let map = Object.create(null);
    for (let x of arr) (map[x] = map[x] || []).push(x);

    let res = [];
    for (let k of Object.keys(map)) res.push({ value: k, count: map[k].length });
    return res;
}