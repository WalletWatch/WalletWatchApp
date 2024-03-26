import { createAction, createReducer } from "@reduxjs/toolkit";

type Wallet = {
    id: number;
    wallet_name: string;
    wallet_address: string;
}

const addWallet = createAction<Wallet>('ADD_WALLET')
const removeWallet = createAction<number>('REMOVE_WALLET')
const updateWallet = createAction<Wallet[]>('UPDATE_WALLET')

let initialState: Wallet[] = [];

const walletReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addWallet, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(updateWallet, (state, action) => {
            return action.payload;
        })
        .addCase(removeWallet, (state, action) => {
            return state.filter(
                (wallet, i) => wallet.id !== action.payload
            );
        });
  });


export default walletReducer;