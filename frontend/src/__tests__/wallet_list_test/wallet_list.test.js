import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import WalletList from '../../components/wallet_list/wallet_list';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('WalletList Component', () => {
    it('should render title correctly', () => {
        const store = mockStore({
        wallet: [
                { id: 1, wallet_name: 'Test Wallet 1', wallet_address: '0x1234567890abcdef' },
                { id: 2, wallet_name: 'Test Wallet 2', wallet_address: '0xabcdef1234567890' },
            ],
        });
        const { getByText } = render(
        <Provider store={store}>
            <WalletList />
        </Provider>
        );
        expect(getByText('Wallets')).toBeInTheDocument();
    });

    it('should render wallet items correctly', () => {
        const store = mockStore({
        wallet: [
            { id: 1, wallet_name: 'Test Wallet 1', wallet_address: '0x1234567890abcdef' },
            { id: 2, wallet_name: 'Test Wallet 2', wallet_address: '0xabcdef1234567890' },
        ],
        });
        const { getByText } = render(
        <Provider store={store}>
            <WalletList />
        </Provider>
        );
        expect(getByText('Test Wallet 1')).toBeInTheDocument();
        expect(getByText('Test Wallet 2')).toBeInTheDocument();
    });

    it('should not render anything if there are no wallets', () => {
        const store = mockStore({
            wallet: [],
        });
        const { queryByTestId } = render(
        <Provider store={store}>
            <WalletList />
        </Provider>
        );
        expect(queryByTestId('Wallets')).not.toBeInTheDocument();
    });
});
