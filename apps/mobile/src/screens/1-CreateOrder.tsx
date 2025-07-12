import React, { useEffect } from 'react'
import { StyleSheet, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CoffeeList, Header } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetworkContext } from '../context';
import { useSelector } from 'react-redux';
import { Order } from '@yellow-ladder-coffee/types';
import { useCreateOrder } from '../hooks';

export const CreateOrder = () => {
    const { isInternetReachable } = useNetworkContext();
    const { orders } = useSelector((state: { orders: { orders: Order[] } }) => state.orders)
    const { createOrderRequest } = useCreateOrder(true)

    useEffect(() => {
        console.log('orders', orders)
        if (orders.length && isInternetReachable) {
            orders.forEach(order => {
                console.log('order.orderDrinks', order.orderDrinks)
                createOrderRequest(order.orderDrinks)
            })

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInternetReachable, orders])

    return (
        <LinearGradient
            colors={['#6F4E37', '#8B4513', '#A0522D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.container} edges={['top']}>

                {/* Header */}
                <Header />

                {/* Content */}
                <CoffeeList />

            </SafeAreaView>
            <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    bottomSafeArea: {
        backgroundColor: 'white',
    },
});
