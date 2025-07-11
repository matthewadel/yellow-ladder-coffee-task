import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, OrderItem } from '../types/navigation';
import { SCREENS } from './constants';

export type NavigationService = NavigationProp<RootStackParamList>;

export const navigationHelpers = {
  navigateToCreateOrder: (navigation: NavigationService) => {
    navigation.navigate(SCREENS.CREATE_ORDER);
  },

  navigateToOrderSummary: (
    navigation: NavigationService,
    params: {
      orderItems: OrderItem[];
      onEditItem: (item: OrderItem) => void;
      onRemoveItem: (itemId: string) => void;
      onSubmitOrder: () => void;
    }
  ) => {
    navigation.navigate(SCREENS.ORDER_SUMMARY, params);
  },

  goBack: (navigation: NavigationService) => {
    navigation.goBack();
  },
};
