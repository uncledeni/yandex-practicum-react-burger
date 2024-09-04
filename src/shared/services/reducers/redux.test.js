import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

describe('redux test', () => {

    test('r1', async () => {
        const mockStore = configureMockStore();
        const store = mockStore({data: null});

        
        console.log(store);
    })

})