import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';
import { OrderDrink } from '@yellow-ladder-coffee/types';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

interface OrderItemProps {
    item: OrderDrink;
    onEdit: (item: OrderDrink) => void;
    onRemove: (itemId: string) => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({
    item,
    onEdit,
    onRemove,
}) => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                    {item.name || 'Unknown Coffee'}
                </Text>
                <Text style={styles.itemSize} numberOfLines={1}>
                    Size: {item.size ? item.size.charAt(0).toUpperCase() + item.size.slice(1) : 'Unknown'}
                </Text>
            </View>
            <View style={styles.itemActions}>
                <Text style={styles.itemPrice}>£{item.price?.toFixed(2) || '0.00'}</Text>
                <View style={styles.actionButtons}>
                    <MaterialIconsIcon onPress={() => onEdit(item)} name="edit" color={"#000"} size={s(20)} />
                    <Octicons onPress={() => onRemove(item.id)} name="trash" color={"#000"} size={s(20)} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: s(16),
        minHeight: s(80),
    },
    itemInfo: {
        flex: 1,
        paddingRight: s(16),
        justifyContent: 'center',
    },
    itemName: {
        fontSize: s(18),
        fontWeight: '600',
        color: '#333',
        marginBottom: s(6),
        lineHeight: s(22),
    },
    itemSize: {
        fontSize: s(14),
        color: '#666',
        lineHeight: s(18),
    },
    itemActions: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        minWidth: s(100),
    },
    itemPrice: {
        fontSize: s(18),
        fontWeight: '700',
        color: '#C17D3A',
        marginBottom: s(8),
        textAlign: 'right',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: s(8),
        alignItems: 'center',
    },
});
