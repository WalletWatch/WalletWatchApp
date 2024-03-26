import React from 'react';
import { shallow, configure } from 'enzyme';
import { useDispatch } from 'react-redux';
import { fetchBalance } from '../http/balance_api.ts';
import { fetchWallet } from '../http/wallet_api.ts';
import App from '../App.tsx';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));
jest.mock('../http/balance_api.ts', () => ({
    fetchBalance: jest.fn(),
}));
jest.mock('../http/wallet_api.ts', () => ({
    fetchWallet: jest.fn(),
}));

describe('App', () => {
    let dispatchMock;

    beforeEach(() => {
        dispatchMock = jest.fn();
        useDispatch.mockReturnValue(dispatchMock);
    });

    it('renders components', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find('div.App').exists()).toBeTruthy();
        expect(wrapper.find('div.control-panel').exists()).toBeTruthy();
        expect(wrapper.find('WalletList').exists()).toBeTruthy();
        expect(wrapper.find('div.button-wrapper').exists()).toBeTruthy();
        expect(wrapper.find('WalletForm').exists()).toBeTruthy();
        expect(wrapper.find('TokenForm').exists()).toBeTruthy();
        expect(wrapper.find('TokenTable').exists()).toBeTruthy();
        expect(wrapper.find('div.footer').exists()).toBeTruthy();
    });
});
