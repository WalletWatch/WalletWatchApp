import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import WalletForm from '../../components/wallet_form/wallet_form';
import { createWallet } from '../../http/wallet_api';
import { addWallet } from '../../store/actions';

const mockStore = configureStore([]);

// Мокаем функции из внешних зависимостей
jest.mock('../../http/wallet_api');
jest.mock('../../store/actions');

describe('WalletForm Component', () => {
    let store;

    beforeEach(() => {
        // Сброс моков перед каждым тестом
        createWallet.mockClear();
        addWallet.mockClear();

        store = mockStore({
            token: [],
            wallet: []
        });
    });

    test('renders without errors', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <WalletForm />
            </Provider>
        );
        expect(getByText('Add wallet')).toBeInTheDocument();
        expect(getByPlaceholderText('Input name for wallet...')).toBeInTheDocument();
        expect(getByPlaceholderText('Input wallet address...')).toBeInTheDocument();
        expect(getByText('Add new wallet')).toBeInTheDocument();
    });

    test('shows form when "Add wallet" button is clicked', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <WalletForm />
            </Provider>
        );
        fireEvent.click(getByText('Add wallet'));
        expect(getByTestId('wallet-form')).toHaveStyle({ display: 'flex' });
    });

    test('hides form when clicked outside', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <WalletForm />
            </Provider>
        );
        fireEvent.click(getByText('Add wallet'));
        fireEvent.click(document);
        expect(getByTestId('wallet-form')).toHaveStyle({ display: 'none' });
    });

    test('validates input fields and shows errors', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <WalletForm />
            </Provider>
        );
        fireEvent.click(getByText('Add new wallet'));
        await waitFor(() => {
            expect(getByText('Name is too short')).toBeInTheDocument();
            expect(getByText('Address is too short')).toBeInTheDocument();
        });
    });

    // test('calls createWallet and dispatches addWallet action when form is submitted with valid data', async () => {
    //     const { getByText, getByPlaceholderText } = render(
    //         <Provider store={store}>
    //             <WalletForm />
    //         </Provider>
    //     );
    //     fireEvent.click(getByText('Add wallet'));
    //     fireEvent.change(getByPlaceholderText('Input name for wallet...'), { target: { value: 'Test Wallet' } });
    //     fireEvent.change(getByPlaceholderText('Input wallet address...'), { target: { value: '0x1234567890abcdef' } });
    //     fireEvent.click(getByText('Add new wallet'));
    //     waitFor(() => {
                // expect(createWallet).toHaveBeenCalled();
    //         expect(addWallet).toHaveBeenCalled();
    //     });
    // });
});
