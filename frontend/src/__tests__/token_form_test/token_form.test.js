import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import TokenForm from '../../components/token_form/token_form';

const mockStore = configureStore([]);

// Mocking http/balance_api.ts
jest.mock('../../http/balance_api.ts', () => ({
  createBalance: jest.fn(),
}));

// Mocking store/actions.ts
jest.mock('../../store/actions.ts', () => ({
  addToken: jest.fn(),
}));

describe('TokenForm component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            token: [],
            wallet: []
        });
    });
    it('renders form fields correctly', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <Provider store={store}>
                <TokenForm />
            </Provider>
        );

        expect(getByLabelText('Token address')).toBeInTheDocument();
        expect(getByPlaceholderText('Input Token address...')).toBeInTheDocument();
        // Add assertions for other form fields as needed
    });

    it('validates input fields on submit', () => {
        const { getByText } = render(
            <Provider store={store}>
                <TokenForm />
            </Provider>
        );
        fireEvent.click(getByText('Add new wallet'));

        expect(getByText('Address is too short')).toBeInTheDocument();
        expect(getByText('Choose wallet')).toBeInTheDocument();
        expect(getByText('Choose network')).toBeInTheDocument();
        // Add more assertions for validation messages as needed
    });

    // it('submits form data and dispatches addToken action on successful submission', async () => {
    //     const { getByText, getByPlaceholderText } = render(
    //         <Provider store={store}>
    //             <TokenForm />
    //         </Provider>
    //     );
    //     const addressInput = getByPlaceholderText('Input Token address...');
    //     fireEvent.change(addressInput, { target: { value: '0x1234567890abcdef' } });

    //     fireEvent.click(getByText('Add new wallet'));

    //     await waitFor(() => {
    //         expect(createBalance).toHaveBeenCalled();
    //         expect(addToken).toHaveBeenCalled();
    //     });
    // });

    it('displays error message on failed form submission', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <TokenForm />
            </Provider>
        );
        const addressInput = getByPlaceholderText('Input Token address...');
        fireEvent.change(addressInput, { target: { value: 'invalid-address' } });
        fireEvent.click(getByText('Add new wallet'));

        await waitFor(() => {
            expect(getByText('Choose wallet')).toBeInTheDocument();
            expect(getByText('Choose network')).toBeInTheDocument();
        });
    });
});
