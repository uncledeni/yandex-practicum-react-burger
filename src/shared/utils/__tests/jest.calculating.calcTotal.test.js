import { calcTotal } from "../calculating";

describe('calcTotal', () => {
    test('should be success', () => {
        const testObj = {
            bun: {
                _id: "643d69a5c3f7b9001cfa093c",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            },
            fillings: [
                {
                    ingredient: {
                        _id: "643d69a5c3f7b9001cfa093e",
                        name: "Филе Люминесцентного тетраодонтимформа",
                        type: "main",
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 643,
                        price: 988,
                        image: "https://code.s3.yandex.net/react/code/meat-03.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
                        __v: 0
                    },
                    id: "ae28db84-c28a-4af1-a234-cb60e0b42fc9"
                },
                {
                    ingredient: {
                        _id: "643d69a5c3f7b9001cfa0941",
                        name: "Биокотлета из марсианской Магнолии",
                        type: "main",
                        proteins: 420,
                        fat: 142,
                        carbohydrates: 242,
                        calories: 4242,
                        price: 424,
                        image: "https://code.s3.yandex.net/react/code/meat-01.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
                        __v: 0
                    },
                    id: "3cba4b24-e349-4279-b583-b133fba8b6ba"
                }
            ]

        }
        const result = calcTotal(testObj);

        expect(result).toEqual(3922)
    })
})