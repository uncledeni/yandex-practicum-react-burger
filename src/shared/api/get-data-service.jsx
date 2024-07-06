import { request } from "../utils/checks";

export const getDataService = async () => await request('ingredients');

export const postOrder = async (data) => await request('orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        "ingredients": data
    })
})