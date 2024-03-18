import tokenReducer from '../../store/token_reducer.ts';
import { addToken, removeToken, updateToken, updateAllToken } from "../../store/actions.ts";
import {fetchBalance} from "../../http/balance_api.ts";

describe('tokenReducer', () => {
    it('should return the initial state', async () => {
        const initialState = []; // Получите начальное состояние с помощью fetchBalance
        const state = tokenReducer(initialState, { type: 'unknown' });
        expect(state).toEqual(initialState);
    });

    it('should handle ADD_TOKEN', () => {
        const initialState = []; // начальное состояние пустое
        const token = { id: 1, wallet_name: 'Test Wallet', asset: 'BTC', balance: 10 };
        const action = addToken(token);
        const state = tokenReducer(initialState, action);
        expect(state).toEqual([token]);
    });

    it('should handle REMOVE_TOKEN', () => {
        const initialState = [{ id: 1, wallet_name: 'Test Wallet', asset: 'BTC', balance: 10 }];
        const action = removeToken(1); // удаляем токен с id 1
        const state = tokenReducer(initialState, action);
        expect(state).toEqual([]);
    });

    it('should handle UPDATE_TOKEN', () => {
        const initialState = [{ id: 1, wallet_name: 'Test Wallet', asset: 'BTC', balance: 10 }];
        const updatedToken = { id: 1, wallet_name: 'Updated Wallet', asset: 'BTC', balance: 20 };
        const action = updateToken(updatedToken);
        const state = tokenReducer(initialState, action);
        expect(state).toEqual([updatedToken]);
    });

    it('should handle UPDATE_ALL_TOKEN', () => {
        const initialState = [{ id: 1, wallet_name: 'Test Wallet', asset: 'BTC', balance: 10 }];
        const updatedTokens = [{ id: 2, wallet_name: 'Wallet 2', asset: 'ETH', balance: 5 }];
        const action = updateAllToken(updatedTokens);
        const state = tokenReducer(initialState, action);
        expect(state).toEqual(updatedTokens);
    });
});
