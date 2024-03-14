import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RemoveWallet from '../components/wallet_list/remove_wallet';
import { useDispatch } from 'react-redux';

// Mock useDispatch to avoid using actual Redux store in tests
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('RemoveWallet', () => {
  const mockData = {
    id: 1,
    wallet_name: 'Test Wallet',
    wallet_address: 'Test Address',
  };

  test('clicking on remove button dispatches actions', () => {
    // Mock useDispatch hook
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Render the RemoveWallet component with mock data
    const { getByRole } = render(<RemoveWallet data={mockData} />);

    // Simulate a click on the remove button
    fireEvent.click(getByRole('button'));

    // Expect dispatch to be called with removeToken and removeWallet actions
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(removeToken(mockData.id));
    expect(mockDispatch).toHaveBeenCalledWith(removeWallet(mockData.id));
  });
});


// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import RemoveWallet from '../src/components/wallet_list/remove_wallet';
// import { removeToken, removeWallet } from '../src/store/actions.ts';
// import { deleteWallet } from '../src/http/wallet_api.ts';

// const mockStore = configureStore([]);

// describe('RemoveWallet component', () => {
//   let store;
//   let walletData;

//   beforeEach(() => {
//     store = mockStore({
//       token: [
//         { id: 1, wallet_id: 1 },
//         { id: 2, wallet_id: 2 },
//       ],
//     });

//     walletData = {
//       id: 1,
//       wallet_name: 'Test Wallet',
//       wallet_address: 'test_address',
//     };
//   });

//   test('renders component correctly', () => {
//     const { container } = render(
//       <Provider store={store}>
//         <RemoveWallet data={walletData} />
//       </Provider>
//     );
//     expect(container).toMatchSnapshot();
//   });

//   test('dispatches removeToken and removeWallet actions on click', () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <RemoveWallet data={walletData} />
//       </Provider>
//     );

//     fireEvent.click(getByTestId('remove-button-wrapper'));

//     const actions = store.getActions();

//     // Check if removeToken action is dispatched for each token related to the wallet
//     expect(actions).toEqual([
//       removeToken(1), // Token id 1 is associated with wallet id 1
//     ]);

//     // Check if removeWallet action is dispatched with correct wallet id
//     expect(actions).toContainEqual(removeWallet(walletData.id));

//     // Check if deleteWallet function is called with correct wallet id
//     expect(deleteWallet).toHaveBeenCalledWith(walletData.id);
//   });
// });
