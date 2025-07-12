import { OrderDrink } from "@yellow-ladder-coffee/types";
import { createOrder } from "@yellow-ladder-coffee/api-request";
import { useAppDispatch } from "../store/hooks";
import { useNetworkStatus } from "./useNetworkStatus";
import { showToast } from "../ui/toast-simple";
import { createOrder as createOrderAction } from "../store/ordersSlice";
import { useState } from "react";
import { getApiOptions } from "../utils/apiConfig";

const useCreateOrder = (resendFailedRequests?: boolean) => {

    const dispatch = useAppDispatch();
    const isInternetReachable = useNetworkStatus();
    const [isLoading, setIsLoading] = useState(false);

    const saveToRedux = (orderItems: OrderDrink[]) => {
        if (!resendFailedRequests) {
            dispatch(createOrderAction({
                id: new Date().getTime().toString(),
                orderDrinks: orderItems,
                orderTimestamp: new Date().toISOString()
            }));
            showToast('your order is saved, once connected to the internet, we\'ll create everything for you', 'warning');
        }
    }

    const createOrderRequest = async (orderItems: OrderDrink[]) => {
        if (!isInternetReachable) {
            saveToRedux(orderItems)
        }
        else {
            setIsLoading(true);
            try {
                const orderData = {
                    orderDrinks: orderItems.map(item => ({
                        id: item.id.split('-')[0],
                        size: item.size,
                    })),
                };

                const apiOptions = getApiOptions();
                const createdOrder = await createOrder(orderData, apiOptions);
                
                if (createdOrder) {
                    showToast('Order Created Successfully!', 'success');
                } else {
                    saveToRedux(orderItems)
                }
            } catch (error) {
                console.error('Error creating order:', error);
                
                const errorMessage = error instanceof Error ? error.message : 'Failed to create order. Please try again.';
                
                if (isInternetReachable) {
                    showToast(errorMessage, 'error');
                }
                saveToRedux(orderItems)
            } finally {
                setIsLoading(false);
            }
        }
    }

    return {
        createOrderRequest,
        isLoading,
    }
}

export { useCreateOrder }