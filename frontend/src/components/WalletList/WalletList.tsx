import React from 'react';
import "./WalletList.css";
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import WalletItem from "./WalletItem.tsx";

function WalletList() {
    const wallets = useSelector((state: RootState) => state.wallet)

    return (
        <div className="wallet">
            <div className="wallet_list_title">Wallets</div>
            <div className="wallet_list">
                {wallets && wallets.map((wallet, indx) =>
                    <WalletItem key={wallet.id} indx={indx} wallet={wallet}/>
                )}
            </div>
        </div>
    );
}

export default WalletList;
