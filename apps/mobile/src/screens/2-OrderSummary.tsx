import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { OrderDrink } from '@yellow-ladder-coffee/shared-types';
import {
    OrderSummaryHeader,
    OrderSummaryFooter,
    OrderList,
} from '../components/2-OrderSummary';
import { useCreateOrder } from '../hooks';

export const OrderSummaryScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const [orderItems, setOrderItems] = useState<OrderDrink[]>([])
    const { createOrderRequest, isLoading } = useCreateOrder()
    const { orderItems: inputOrderItems, onEditItem, onRemoveItem, onSubmitOrder } = route.params;

    useEffect(() => {
        if (inputOrderItems)
            setOrderItems([...inputOrderItems])
    }, [inputOrderItems])

    const handleEditItem = (item: OrderDrink) => {
        onEditItem(item);
        navigation.goBack();
    };

    const OnAcceptRemoveItem = (itemId: string) => {
        setOrderItems(prev => prev.filter(item => item.id !== itemId));

        onRemoveItem(itemId);
        if (orderItems.length === 1) {
            navigation.goBack();
        }

    }

    const handleRemoveItem = (itemId: string) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your order?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => OnAcceptRemoveItem(itemId)
                }
            ]
        );
    };


    const handleSubmitOrder = () => {

        createOrderRequest(orderItems)
        onSubmitOrder();
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={['#6F4E37', '#8B4513', '#A0522D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.container} edges={['top']}>
                <OrderSummaryHeader onBackPress={() => navigation.goBack()} />
                <View style={styles.content}>
                    <OrderList
                        orderItems={orderItems}
                        onEditItem={handleEditItem}
                        onRemoveItem={handleRemoveItem}
                    />
                    <OrderSummaryFooter
                        orderItems={orderItems}
                        onSubmitOrder={handleSubmitOrder}
                        isLoading={isLoading}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
        </LinearGradient>
    );

};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        margin: s(16),
        borderRadius: s(20),
        paddingHorizontal: s(20),
    },
    bottomSafeArea: {
        backgroundColor: 'white',
    },
});
