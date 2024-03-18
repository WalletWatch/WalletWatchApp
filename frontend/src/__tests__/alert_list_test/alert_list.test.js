import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import AlertList from '../../components/alert_list/alert';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('WalletList Component', () => {
    it('should render title correctly', () => {
        const store = mockStore({
            alert: [
                { wallet: "test", asset: "ETH", balance: 0.34, price: 1.2, updated: "26.03.2024T12:00:00" },
                { wallet: "test_2", asset: "ETH", balance: 5.4, price: 0, updated: "26.03.2024T16:00:00" }
            ]
        });
        const { getByText } = render(
        <Provider store={store}>
            <AlertList />
        </Provider>
        );
        expect(getByText('Notifications')).toBeInTheDocument();
    });

    it('should render alert items correctly', () => {
        const store = mockStore({
            alert: [
                { wallet: "test", asset: "ETH", balance: 0.34, price: 1.2, updated: "26.03.2024T12:00:00" },
                { wallet: "test_2", asset: "ETH", balance: 5.4, price: 0, updated: "26.03.2024T16:00:00" }
            ]
        });
        const { getByText } = render(
        <Provider store={store}>
            <AlertList />
        </Provider>
        );
        expect(getByText('test')).toBeInTheDocument();
        expect(getByText('test_2')).toBeInTheDocument();
    });

    it('should not render anything if there are no wallets', () => {
        const store = mockStore({
            alert: [],
        });
        const { queryByTestId } = render(
        <Provider store={store}>
            <AlertList />
        </Provider>
        );
        expect(queryByTestId('test')).not.toBeInTheDocument();
    });
});
