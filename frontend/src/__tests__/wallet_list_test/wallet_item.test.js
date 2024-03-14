import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import WalletItem from '../../components/wallet_list/wallet_item';
import * as copy from 'copy-to-clipboard';

const mockStore = configureStore([]);
jest.mock('copy-to-clipboard'); 

describe('WalletItem Component', () => {
    let store;
    let wallet;

    beforeEach(() => {
        store = mockStore({
          token: [
            { id: 1, wallet_id: 1 },
            { id: 2, wallet_id: 2 },
          ],
        });
    
        wallet = {
          id: 1,
          wallet_name: 'Test Wallet',
          wallet_address: '0x1234567890abcdef',
        };
    });

    it('should render wallet name and partial wallet address', () => {
        const { getByText } = render(
            <Provider store={store}>
                <WalletItem indx={1} wallet={wallet} />
            </Provider>
        );
        expect(getByText(wallet.wallet_name)).toBeInTheDocument();
        expect(getByText(wallet.wallet_address.slice(0, 8))).toBeInTheDocument();
    });

    it('copies wallet address when copy button is clicked', () => {
      const { getByTestId } = render(
        <Provider store={store}>
            <WalletItem indx={1} wallet={wallet} />
        </Provider>
      );
      const copyButton = getByTestId('copy_button');
      fireEvent.click(copyButton);
      expect(copyButton).toHaveTextContent('Copied!'); // Check if button text changes to "Copied!" after copying
    });
});
