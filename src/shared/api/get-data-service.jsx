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