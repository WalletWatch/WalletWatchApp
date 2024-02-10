/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./RemoveWallet.css";
import { removeToken, removeWallet } from "../../store/actions.ts";
import { deleteWallet } from "../../http/walletApi.ts";
import { RootState } from '../../store/store.ts';
import { deleteBalance } from '../../http/balanceApi.ts';

type Wallet = {
    id: number;
    wallet_name: string;
    wallet_address: string;
}

type RemoveWalletProps = {
    data: Wallet
}

function RemoveWallet({data}: RemoveWalletProps) {
    const dispatch = useDispatch();
    const balance = useSelector((state: RootState) => state.token);

    const handleClick = (e:any) => {
        e.preventDefault();
        balance.forEach((token) => {
            if (token.wallet_id === data.id) {
                dispatch(removeToken(token.id))
            }
        })
        deleteWallet(data.id);
        dispatch(removeWallet(data.id));
    }

    return (
        <div 
            className="remove-button-wrapper"
            onClick={handleClick}
        >
            <div className="delete_svg">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 24 24">
                    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
                </svg>
            </div>
        </div>
    );
}

export default RemoveWallet;
