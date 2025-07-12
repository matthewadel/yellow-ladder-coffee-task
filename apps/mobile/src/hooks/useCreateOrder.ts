import { OrderDrink } from "@yellow-ladder-coffee/shared-types";
import { useAppDispatch } from "../store/hooks";
import { useNetworkStatus } from "./useNetworkStatus";
import { showToast } from "../ui/toast-simple";
import { createOrderAPI } from "../api/requests";
import { createOrder } from "../store/ordersSlice";
import { useState } from "react";

const useCreateOrder = (resendFailedRequests?: boolean) => {

    const dispatch = useAppDispatch();
    const isInternetReachable = useNetworkStatus();
    const [isLoading, setIsLoading] = useState(false);

    const saveToRedux = (orderItems: OrderDrink[]) => {
        if (!resendFailedRequests) {
            dispatch(createOrder({
                id: new Date().getTime().toString(),
                orderDrinks: orderItems,
                orderTimestamp: new Date().toISOString()
            }));
            showToast('your order is saved, once connected to the internet, we\'ll create everything for you', 'warning');
        }
    }

    const createOrderRequest = (orderItems: OrderDrink[]) => {
        if (!isInternetReachable) {
            saveToRedux(orderItems)
        }
        else {
            setIsLoading(true);
            fetch(createOrderAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderDrinks: orderItems.map(item => ({
                        id: item.id.split('-')[0],
                        size: item.size,
                    })),
                }),
            })
                .then(response => { console.log(response); return response.json() })
                .then(data => {
                    if (data.data) {
                        showToast('Order submitted successfully!', 'success');
                    } else {
                        saveToRedux(orderItems)
                    }
                })
                .catch(error => {
                    console.error('Error creating order:', error);
                    if (isInternetReachable)
                        showToast(error.message || 'Failed to create order. Please try again.', 'error');
                    saveToRedux(orderItems)
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    return {
        createOrderRequest,
        isLoading,
    }
}

export { useCreateOrder }