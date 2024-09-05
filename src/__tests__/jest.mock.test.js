import { register } from "../shared/api/get-data-service";
import { BASE_URL } from "../shared/utils";

describe('register', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(
                { result: 'OK' }
            ),
            ok: true
        })
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('should be successfull', async () => {
        const regResult = await register('email', 'password', 'name');
        expect(regResult).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })
    // test('should be failed', async () => {
    //     fetch.mockImplementationOnce(() => Promise.resolve({
    //         ok: false,
    //         json: () => Promise.resolve('Ошибка: 500'),
    //         status: 500
    //     }))

    //     await expect(register('email', 'password', 'name')).rejects.toBe('Ошибка: 500');
    //     expect(fetch).toHaveBeenCalledTimes(1);
    //     expect(fetch).toHaveBeenCalledWith(`${BASE_URL}auth/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: JSON.stringify({
    //             "email": "email",
    //             "password": "password",
    //             "name": "name"
    //         })
    //     });
    // })
})