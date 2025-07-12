import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Drink } from '@yellow-ladder-coffee/shared-types';
import { getDrinksAPI } from '../api/requests';

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
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(getDrinksAPI);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const {data} = await response.json();
            return data;
        } catch (error) {
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
                state.error = action.payload as string;
            });
    },
});

// Export actions
export const { clearError, clearDrinks } = drinksSlice.actions;

// Export reducer
export default drinksSlice.reducer;
