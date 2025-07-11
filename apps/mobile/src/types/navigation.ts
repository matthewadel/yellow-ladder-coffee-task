import { SCREENS } from '../navigation/constants';

export interface OrderItem {
    id: string;
    name: string;
    size: string;
    price: number;
}

export type RootStackParamList = {
    [SCREENS.CREATE_ORDER]: undefined;
    [SCREENS.ORDER_SUMMARY]: {
        orderItems: OrderItem[];
        onEditItem: (item: OrderItem) => void;
        onRemoveItem: (itemId: string) => void;
        onSubmitOrder: () => void;
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
