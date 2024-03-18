import { addWallet, addToken, removeToken, removeWallet, updateAllToken, updateToken, addAlert, updateAlert } from '../../store/actions';

describe('Redux Actions', () => {
    it('should create an action to add a wallet', () => {
        const wallet = {
            id: 1,
            wallet_name: 'Test Wallet',
            wallet_address: '0x1234567890',
        };
        const expectedAction = {
            type: 'ADD_WALLET',
            payload: wallet,
        };
        expect(addWallet(wallet)).toEqual(expectedAction);
    });

    it('should create an action to remove a wallet', () => {
        const id = 1;
        const expectedAction = {
            type: 'REMOVE_WALLET',
            payload: id,
        };
        expect(removeWallet(id)).toEqual(expectedAction);
    });

    it('should create an action to add a token', () => {
        const token = {
            id: 1,
            wallet_name: 'Test Wallet',
            asset: 'ETH',
            asset_address: '0x1234567890',
            network: 'mainnet',
            balance: 10,
            price: 1000,
            updated: '2024-03-16',
            createdAt: '2024-03-15',
            wallet_id: 1,
        };
        const expectedAction = {
            type: 'ADD_TOKEN',
            payload: token,
        };
        expect(addToken(token)).toEqual(expectedAction);
    });

    it('should create an action to remove a token', () => {
        const id = 1;
        const expectedAction = {
            type: 'REMOVE_TOKEN',
            payload: id,
        };
        expect(removeToken(id)).toEqual(expectedAction);
    });

    it('should create an action to update all tokens', () => {
        const tokens = [{
            id: 1,
            wallet_name: 'Test Wallet',
            asset: 'ETH',
            asset_address: '0x1234567890',
            network: 'mainnet',
            balance: 10,
            price: 1000,
            updated: '2024-03-16',
            createdAt: '2024-03-15',
            wallet_id: 1,
        }];
        const expectedAction = {
            type: 'UPDATE_ALL_TOKEN',
            payload: tokens,
        };
        expect(updateAllToken(tokens)).toEqual(expectedAction);
    });

    it('should create an action to update a token', () => {
        const token = {
            id: 1,
            wallet_name: 'Test Wallet',
            asset: 'ETH',
            asset_address: '0x1234567890',
            network: 'mainnet',
            balance: 20,
            price: 1500,
            updated: '2024-03-16',
            createdAt: '2024-03-15',
            wallet_id: 1,
        };
        const expectedAction = {
            type: 'UPDATE_TOKEN',
            payload: token,
        };
        expect(updateToken(token)).toEqual(expectedAction);
    });

    it('should create an action to add an alert', () => {
        const alert = {
            wallet: "test",
            asset: "ETH",
            balance: 0.34,
            price: 1.2,
            updated: "26.03.2024T12:00:00"
        };
        const expectedAction = {
            type: 'ADD_ALERT',
            payload: alert,
        };
        expect(addAlert(alert)).toEqual(expectedAction);
    });

    it('should create an action to update an alert', () => {
        const alerts = [{
            wallet: "test",
            asset: "ETH",
            balance: 0.34,
            price: 1.2,
            updated: "26.03.2024T12:00:00"
        }];
        const expectedAction = {
            type: 'UPDATE_ALL_ALERT',
            payload: alerts,
        };
        expect(updateAlert(alerts)).toEqual(expectedAction);
    });
});