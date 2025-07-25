import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Drink } from '@yellow-ladder-coffee/types';
import { getDrinks } from '@yellow-ladder-coffee/api-request';
import { getApiOptions } from '../utils/apiConfig';

// Define the state interface
interface DrinksState {
    drinks: Drink[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: DrinksState = {
    drinks: [],
    loading: false,
    error: null,
};

// Async thunk for fetching drinks from the API
export const fetchDrinks = createAsyncThunk(
    'drinks/fetchDrinks',
    async (_, { rejectWithValue, getState }) => {
        try {
            const apiOptions = getApiOptions();
            const data = await getDrinks(apiOptions);
            return data;
        } catch (error) {
            // Check if we have cached drinks, if so, don't show error for offline case
            const state = getState() as { drinks: DrinksState };
            if (state.drinks.drinks.length > 0) {
                // If we have cached drinks, silently fail and keep using cached data
                throw new Error('OFFLINE_WITH_CACHE');
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

// Create the drinks slice
const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        // Optional: Add synchronous reducers if needed
        clearError: (state) => {
            state.error = null;
        },
        clearDrinks: (state) => {
            state.drinks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(fetchDrinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Handle fulfilled state
            .addCase(fetchDrinks.fulfilled, (state, action: PayloadAction<Drink[]>) => {
                state.loading = false;
                state.drinks = action.payload;
                state.error = null;
            })
            // Handle rejected state
            .addCase(fetchDrinks.rejected, (state, action) => {
                state.loading = false;
                // If we have cached drinks and failed due to offline, don't set error
                if (action.error.message === 'OFFLINE_WITH_CACHE' && state.drinks.length > 0) {
                    state.error = null;
                } else {
                    state.error = action.payload as string;
                }
            });
    },
});

// Export actions
export const { clearError, clearDrinks } = drinksSlice.actions;

// Export reducer
export default drinksSlice.reducer;
