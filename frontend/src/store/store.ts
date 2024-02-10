import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import walletReducer from './walletReducer.ts';
import tokenReducer from './tokenReducer.ts';

const rootReducer = combineReducers({
    wallet: walletReducer,
    token: tokenReducer,
});

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;