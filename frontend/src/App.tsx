import React, { useEffect } from 'react';
import './App.css';
import TokenTable from './components/token_table/token_table.tsx';
import TokenForm from './components/token_form/token_form.tsx';
import WalletList from './components/wallet_list/wallet_list.tsx';
import WalletForm from './components/wallet_form/wallet_form.tsx';
import { useDispatch } from 'react-redux';
import { fetchBalance } from './http/balance_api.ts';
import { updateAllToken, updateWallet } from './store/actions.ts';
import { fetchWallet } from './http/wallet_api.ts';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchBalance().then((data) => dispatch(updateAllToken(data)));
        fetchWallet().then((data) => dispatch(updateWallet(data)));
    }, [])

    return (
        <div className="App">
            <div className='control-panel'>
                <WalletList/>
                <div className='button-wrapper'>
                    <WalletForm/>
                    <TokenForm/>
                </div>
            </div>
            <TokenTable/>
            <div className='footer'>v1.0.0</div>
        </div>
    );
}

export default App;
