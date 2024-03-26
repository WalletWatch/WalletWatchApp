import { createAction, createReducer } from "@reduxjs/toolkit";

type Token = {
    id: number;
    wallet_name: string;
    asset: string;
    asset_address: string;
    network_name: string;
    network: number;
    balance: number;
    price: number;
    updated: string;
    createdAt: string;
    wallet_id: number;
}


const addToken = createAction<Token>('ADD_TOKEN')
const removeToken = createAction<number>('REMOVE_TOKEN')
const updateToken = createAction<Token>('UPDATE_TOKEN')
const updateAllToken = createAction<Token[]>('UPDATE_ALL_TOKEN')

let initialState: Token[] = [];

const tokenReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addToken, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(removeToken, (state, action) => {
            return state.filter(
                (token, i) => token.id !== action.payload
            );
        })
        .addCase(updateAllToken, (state, action) => {
            return action.payload;
        })
        .addCase(updateToken, (state, action) => {
            return state.map(element => {
                if (element.id === action.payload.id)
                    return element = action.payload
                else
                    return element
            });

        });
  });

export default tokenReducer;