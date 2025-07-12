import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';
import { OrderDrink } from '@yellow-ladder-coffee/shared-types';

interface OrderSummaryFooterProps {
    onSubmitOrder: () => void;
    orderItems: OrderDrink[];
}

export const OrderSummaryFooter: React.FC<OrderSummaryFooterProps> = ({
    orderItems,
    onSubmitOrder,
}) => {
    const isDisabled = orderItems.length === 0;

    const calculateTotal = () => {
        return orderItems.reduce((total: number, item: OrderDrink) => total + item.price, 0);
    };

    return (
        <View style={styles.footer}>
            <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>£{calculateTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    isDisabled && styles.submitButtonDisabled
                ]}
                onPress={onSubmitOrder}
                disabled={isDisabled}
            >
                <Text style={[
                    styles.submitButtonText,
                    isDisabled && styles.submitButtonTextDisabled
                ]}>
                    Submit Order
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#E9ECEF',
        paddingTop: s(16),
        paddingBottom: s(20),
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: s(16),
    },
    totalLabel: {
        fontSize: s(20),
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: s(24),
        fontWeight: '700',
        color: '#C17D3A',
    },
    submitButton: {
        backgroundColor: '#8B4513',
        borderRadius: s(12),
        paddingVertical: s(16),
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#E9ECEF',
    },
    submitButtonText: {
        fontSize: s(18),
        fontWeight: '600',
        color: 'white',
    },
    submitButtonTextDisabled: {
        color: '#999',
    },
});
