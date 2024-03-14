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

    // it('handles row deletion correctly', () => {
    //     const deleteBalanceMock = jest.fn();
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <TokenTable />
    //         </Provider>
    //     );
    //     fireEvent.click(getByText('Delete row'));
    //     expect(deleteBalanceMock).toHaveBeenCalled();
    // });

    // it('updates table data correctly', () => {
    //     const mockWebSocket = jest.fn();
    //     const mockDispatch = jest.fn();
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <TokenTable />
    //         </Provider>
    //     );

    //     fireEvent(mockWebSocket.onmessage, { data: JSON.stringify({ balance: /* mock balance data */ }) });
    //     expect(mockDispatch).toHaveBeenCalled();
    // });
});
