import { addAlert, updateAlert } from '../../store/actions.ts';
import alertReducer from '../../store/alerts_reducer.ts';

describe('alertReducer', () => {
    it('should return the initial state', () => {
        const initialState = []; 
        const state = alertReducer(undefined, { type: 'unknown' });
        expect(state).toEqual(initialState);
    });

    it('should handle ADD_WALLET', () => {
        const initialState = []; 
        const alert = {
            wallet: "test",
            asset: "ETH",
            balance: 0.34,
            price: 1.2,
            updated: "26.03.2024T12:00:00"
        };
        const action = addAlert(alert);
        const state = alertReducer(initialState, action);
        expect(state).toEqual([alert]);
    });

    it('should handle UPDATE_WALLET', () => {
        const initialState = [{
            wallet: "test",
            asset: "ETH",
            balance: 0.34,
            price: 1.2,
            updated: "26.03.2024T12:00:00"
        }];
        const updatedAlerts = [{
            wallet: "test_2",
            asset: "ETH",
            balance: 5.23,
            price: 0,
            updated: "26.03.2024T15:00:00"
        }];
        const action = updateAlert(updatedAlerts);
        const state = alertReducer(initialState, action);
        expect(state).toEqual(updatedAlerts);
    });
});
