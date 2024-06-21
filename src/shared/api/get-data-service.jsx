const BURGER_DATA = "https://norma.nomoreparties.space/api/ingredients";

export const GetDataService = async () => {
    try {
        let response = await fetch(BURGER_DATA);
        let json = await response.json();
        return json;
    } catch (err) {
        alert("Ошибка HTTP: " + err.status);
    }
}