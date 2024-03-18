import { createAction, createReducer } from "@reduxjs/toolkit";
import { Wallet } from "../types";

const addWallet = createAction<Wallet>('ADD_WALLET')
const removeWallet = createAction<number>('REMOVE_WALLET')
const updateAllWallet = createAction<Wallet[]>('UPDATE_ALL_WALLET')
const updateWallet = createAction<Wallet>('UPDATE_WALLET')

let initialState: Wallet[] = [];

const walletReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addWallet, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(updateAllWallet, (state, action) => {
            return action.payload;
        })
        .addCase(updateWallet, (state, action) => {
            return state.map(element => {
                if (element.id === action.payload.id)
                    return element = action.payload
                else
                    return element
            });
        })
        .addCase(removeWallet, (state, action) => {
            return state.filter(
                (wallet, i) => wallet.id !== action.payload
            );
        });
  });


export default walletReducer;