import { addWallet, removeWallet, updateWallet, updateAllWallet } from '../../store/actions.ts';
import walletReducer from '../../store/wallet_reducer.ts';

describe('tokenReducer', () => {
    it('should return the initial state', () => {
        const initialState = []; 
        const state = walletReducer(undefined, { type: 'unknown' });
        expect(state).toEqual(initialState);
    });

    it('should handle ADD_WALLET', () => {
        const initialState = []; 
        const token = { id: 1, wallet_name: 'Test Wallet', wallet_address: "0x0278184" };
        const action = addWallet(token);
        const state = walletReducer(initialState, action);
        expect(state).toEqual([token]);
    });

    it('should handle REMOVE_WALLET', () => {
        const initialState = [{ id: 1, wallet_name: 'Test Wallet', wallet_address: "0x0278184" }];
        const action = removeWallet(1); 
        const state = walletReducer(initialState, action);
        expect(state).toEqual([]);
    });

    it('should handle UPDATE_WALLET', () => {
        const initialState = [{ id: 1, wallet_name: 'Test Wallet', asset: 'BTC', balance: 10 }];
        const updatedTokens = [{ id: 2, wallet_name: 'Wallet 2', asset: 'ETH', balance: 5 }];
        const action = updateWallet(updatedTokens);
        const state = walletReducer(initialState, action);
        expect(state).toEqual(initialState);

        const newUpdatedToken = { id: 1, wallet_name: 'Wallet 2', asset: 'ETH', balance: 5 };
        const action2 = updateWallet(newUpdatedToken);
        const state2 = walletReducer(initialState, action2);
        expect(state2).toEqual([newUpdatedToken]);
    });

    it('should handle UPDATE_ALL_WALLET', () => {
        const initialState = [{ id: 1, wallet_name: 'Test Wallet', asset: 'BTC', balance: 10 }];
        const updatedTokens = [{ id: 2, wallet_name: 'Wallet 2', asset: 'ETH', balance: 5 }];
        const action = updateAllWallet(updatedTokens);
        const state = walletReducer(initialState, action);
        expect(state).toEqual(updatedTokens);
    });
});
