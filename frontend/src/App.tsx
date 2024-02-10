import React from 'react';
import './App.css';
import TokenTable from './components/TokenTable/TokenTable.tsx';
import TokenForm from './components/TokenForm/TokenForm.tsx';
import WalletList from './components/WalletList/WalletList.tsx';
import WalletForm from './components/WalletForm/WalletForm.tsx';

function App() {
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
