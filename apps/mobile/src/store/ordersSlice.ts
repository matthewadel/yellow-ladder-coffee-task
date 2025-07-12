import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDrink, Order } from '@yellow-ladder-coffee/shared-types';

const initialState: { orders: Order[] } = {
    orders: [],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrder: (state, action: PayloadAction<{ orderDrinks: OrderDrink[]; orderTimestamp: string, id: string }>) => {
            state.orders.unshift(action.payload);
        },

        removeOrder: (state, action: PayloadAction<string>) => {
            const orderId = action.payload;
            state.orders = state.orders.filter(order => order.id !== orderId);
        },
    },
});

export const {
    createOrder,
    removeOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
