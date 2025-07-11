import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as screenComponents from '../screens';
import { SCREENS } from './constants';

const Stack = createStackNavigator();

export const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.CREATE_ORDER}
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen
                name={SCREENS.CREATE_ORDER}
                component={screenComponents.CreateOrder}
            />
            <Stack.Screen
                name={SCREENS.ORDER_SUMMARY}
                component={screenComponents.OrderSummaryScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
};
