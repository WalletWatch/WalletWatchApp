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
    });

    it('validates input fields on submit', () => {
        const { getByText } = render(
            <Provider store={store}>
                <TokenForm />
            </Provider>
        );
        fireEvent.click(getByText('Add new token'));

        expect(getByText('Address is too short')).toBeInTheDocument();
        expect(getByText('Choose wallet')).toBeInTheDocument();
        expect(getByText('Choose network')).toBeInTheDocument();
    });

    it('displays error message on failed form submission', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <TokenForm />
            </Provider>
        );
        const addressInput = getByPlaceholderText('Input Token address...');
        fireEvent.change(addressInput, { target: { value: 'invalid-address' } });
        fireEvent.click(getByText('Add new token'));

        await waitFor(() => {
            expect(getByText('Choose wallet')).toBeInTheDocument();
            expect(getByText('Choose network')).toBeInTheDocument();
        });
    });
});
