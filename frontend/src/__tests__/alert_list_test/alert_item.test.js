import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import AlertItem from '../../components/alert_list/alert_item';

describe('AlertItem Component', () => {
    let store;
    let alert;

    beforeEach(() => {
        store = mockStore({
            alert: [
                { wallet: "test", asset: "ETH", balance: 0.34, price: 1.2, updated: "26.03.2024T12:00:00" },
                { wallet: "test_2", asset: "ETH", balance: 5.4, price: 0, updated: "26.03.2024T16:00:00" }
            ]
        });

        alert = { wallet: "test", asset: "ETH", balance: 0.34, price: 1.2, updated: "26.03.2024T12:00:00" }
    });

    it('should render alert wallet and asset', () => {
        const { getByText } = render(
            <Provider store={store}>
                <AlertItem indx={1} alert={alert} />
            </Provider>
        );
        expect(getByText(alert.wallet)).toBeInTheDocument();
        expect(getByText(alert.asset)).toBeInTheDocument();
    });
});
