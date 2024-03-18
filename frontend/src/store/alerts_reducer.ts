import { createAction, createReducer } from "@reduxjs/toolkit";
import { Alert } from "../types";

const addAlert= createAction<Alert>('ADD_ALERT')
const updateAlert = createAction<Alert[]>('UPDATE_ALL_ALERT')

let initialState: Alert[] = [];

const alertReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addAlert, (state, action) => {
            return [...state, action.payload];
        })
        .addCase(updateAlert, (state, action) => {
            return action.payload
        })
  });

export default alertReducer;