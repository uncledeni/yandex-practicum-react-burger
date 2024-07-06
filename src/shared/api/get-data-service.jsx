const BURGER_DATA = "https://norma.nomoreparties.space/api/ingredients";

export const getDataService = async () => {
    const response = await fetch(BURGER_DATA).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка HTTP: ${res.status}`);
    });
    return response;
}

const ORDER_DATA = "https://norma.nomoreparties.space/api/orders";

export const postOrder = async (data) => {
    const response = await fetch(ORDER_DATA,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": data
            })
        }
    ).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка HTTP: ${res.status}`);
    });
    return response;
}