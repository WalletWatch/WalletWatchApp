import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TokenTable from '../../components/token_table/token_table';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('TokenTable component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            token: [],
            wallet: []
        });
    });

    it('renders table columns correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <TokenTable />
            </Provider>
        );

        expect(getByText('wallet')).toBeInTheDocument();
        expect(getByText('asset')).toBeInTheDocument();
        expect(getByText('network')).toBeInTheDocument();
        expect(getByText('quantity')).toBeInTheDocument();
        expect(getByText('price')).toBeInTheDocument();
        expect(getByText('value')).toBeInTheDocument();
        expect(getByText('last_update')).toBeInTheDocument();
    });

    // it('updates table data correctly', () => {
    //     const mockWebSocket = jest.fn();
    //     const mockDispatch = jest.fn();
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <TokenTable />
    //         </Provider>
    //     );

    //     fireEvent(mockWebSocket.onmessage, { 
    //         data: JSON.stringify({ 
    //             balance: { 
    //                 id: 1, 
    //                 asset: 'ETH', 
    //                 asset_address: '0x23d241g',
    //                 wallet_name: 'wallet',
    //                 network_name: 'ERC20',
    //                 balance: 0,
    //                 price: 0,
    //                 updated: "27.03.2024",
    //                 createdAt: "27.03.2024",
    //                 wallet_id: 1,
    //                 network: 1
    //             }
    //         }) 
    //     });
    //     expect(mockDispatch).toHaveBeenCalled();
    // });
});
