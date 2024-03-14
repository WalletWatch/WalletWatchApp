import React from 'react';
import "./wallet_list.css";
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store.ts";
import WalletItem from "./wallet_item.tsx";

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
