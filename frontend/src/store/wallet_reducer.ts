import { createAction, createReducer } from "@reduxjs/toolkit";
import { fetchWallet } from "../http/wallet_api.ts";

type Wallet = {
    id: number;
    wallet_name: string;
    wallet_address: string;
}

const addWallet = createAction<Wallet>('ADD_WALLET')
const removeWallet = createAction<number>('REMOVE_WALLET')

const initialState = await fetchWallet()

const walletReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addWallet, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(removeWallet, (state, action) => {
            return state.filter(
                (wallet, i) => wallet.id !== action.payload
            );
        });
  });


export default walletReducer;