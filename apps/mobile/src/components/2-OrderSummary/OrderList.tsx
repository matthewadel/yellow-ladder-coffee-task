import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';
import { OrderItem } from './OrderItem';
import { OrderItem as OrderItemType } from '../../types';

interface OrderListProps {
    orderItems: OrderItemType[];
    onEditItem: (item: OrderItemType) => void;
    onRemoveItem: (itemId: string) => void;
}

const ItemSeparator = () => <View style={styles.separator} />;

export const OrderList: React.FC<OrderListProps> = ({
    orderItems,
    onEditItem,
    onRemoveItem,
}) => {
    const renderOrderItem = ({ item }: { item: OrderItemType }) => (
        <OrderItem
            item={item}
            onEdit={onEditItem}
            onRemove={onRemoveItem}
        />
    );

    return (
        <FlatList
            data={orderItems}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            style={styles.orderList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    orderList: {
        flex: 1,
        marginTop: s(20),
    },
    listContainer: {
        paddingBottom: s(20),
    },
    separator: {
        height: 1,
        backgroundColor: '#E9ECEF',
        marginHorizontal: s(16),
    },
});
