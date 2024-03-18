import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RemoveWallet from '../../components/wallet_list/remove_wallet.tsx';
import { removeToken, removeWallet } from '../../store/actions.ts';
import { deleteWallet } from '../../http/wallet_api.ts';

const mockStore = configureStore([]);

jest.mock('../../http/wallet_api.ts');

describe('RemoveWallet component', () => {
    let store;
    let walletData;

    beforeEach(() => {
      store = mockStore({
        token: [
          { id: 1, wallet_id: 1 },
          { id: 2, wallet_id: 2 },
        ],
      });

      walletData = {
        id: 1,
        wallet_name: 'Test Wallet',
        wallet_address: 'test_address',
        wallet_sum: 0
      };
    });

    test('renders component correctly', () => {
      const { container } = render(
        <Provider store={store}>
          <RemoveWallet data={walletData} />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    test('dispatches removeToken and removeWallet actions on click', async () => {
      const dom = render(
        <Provider store={store}>
          <RemoveWallet data={walletData} />
        </Provider>
      );
      
      fireEvent.click(dom.getByTestId('remove-button-wrapper'));
      const actions = store.getActions();

      expect([actions[0]]).toEqual([
        removeToken(1), // Token id 1 is associated with wallet id 1
      ]);

      expect(actions).toContainEqual(removeWallet(walletData.id));

      expect(deleteWallet).toHaveBeenCalledWith(walletData.id);
    });
});
