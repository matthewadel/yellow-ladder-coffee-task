import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { s } from 'react-native-size-matters';
import { CoffeeSizeModal } from './CoffeeSizeModal';
import { OrderSummary } from './OrderSummary';

interface CoffeeItem {
    id: string;
    name: string;
    description: string;
    prices: Record<string, number>[]
}

interface OrderItem {
    id: string;
    name: string;
    size: string;
    price: number;
}

export const CoffeeList = () => {
    const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    const handleCoffeePress = (coffee: CoffeeItem) => {
        setSelectedCoffee(coffee);
        setModalVisible(true);
    };

    const handleSizeSelect = (orderItem: OrderItem) => {
        setOrderItems(prev => [...prev, orderItem]);
        console.log('Order added:', orderItem);
        console.log('All orders:', [...orderItems, orderItem]);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedCoffee(null);
    };

    const handleShowOrderSummary = () => {
        setOrderSummaryVisible(true);
    };

    const handleOrderSummaryClose = () => {
        setOrderSummaryVisible(false);
    };

    const handleEditItem = (item: OrderItem) => {
        // Find the original coffee item to re-open the size selection modal
        const coffeeItem = coffeeItems.find(coffee => coffee.name === item.name);
        if (coffeeItem) {
            // Remove the item from the order first
            handleRemoveItem(item.id);
            // Close order summary and open size selection
            setOrderSummaryVisible(false);
            setSelectedCoffee(coffeeItem);
            setModalVisible(true);
        }
    };

    const handleRemoveItem = (itemId: string) => {
        setOrderItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleSubmitOrder = () => {
        console.log('Submitting order:', orderItems);
        // Here you would typically send the order to your backend
        Alert.alert(
            'Order Submitted!', 
            `Total: £${orderItems.reduce((total, item) => total + item.price, 0).toFixed(2)}`,
            [{ text: 'OK' }]
        );
        setOrderItems([]);
        setOrderSummaryVisible(false);
    };
    const coffeeItems: CoffeeItem[] = [
        {
            id: '1',
            name: 'Espresso',
            description: 'Rich, bold shot of pure coffee',
            prices: [
                { small: 2.0, },
                { medium: 2.5, },
                { large: 3.0, }
            ]
        },
        {
            id: '2',
            name: 'Latte',
            description: 'Smooth espresso with steamed milk',
            prices: [
                { small: 3.5, },
                { medium: 3.9, },
                { large: 4.3, }
            ]
        },
        {
            id: '3',
            name: 'Iced Americano',
            description: 'Espresso shots over ice with cold water',
            prices: [
                { medium: 2.5, },
                { large: 3.0, }
            ]
        },
        {
            id: '4',
            name: 'Cappuccino',
            description: 'Classic Italian blend with velvety microfoam',
            prices: [
                { small: 2.0, },
                { medium: 3.0, },
                { large: 3.5, }
            ]
        },
        {
            id: '5',
            name: 'Mocha',
            description: 'Rich espresso meets premium dark chocolate',
            prices: [
                { small: 2.0, },
                { medium: 3.5, },

            ]
        },
        {
            id: '6',
            name: 'Cold Brew',
            description: '12-hour steeped coffee with natural sweetness',
            prices: [
                { small: 2.0, },
                { medium: 2.8, },
                { large: 3.3, }
            ]
        },
    ];

    const renderSize = (size: string, index: number) => {
        const getSizeStyle = (sizeName: string) => {
            switch (sizeName.toLowerCase()) {
                case 'small':
                    return styles.sizeSmall;
                case 'medium':
                    return styles.sizeMedium;
                case 'large':
                    return styles.sizeLarge;
                default:
                    return styles.sizeDefault;
            }
        };

        return (
            <View key={index} style={[styles.size, getSizeStyle(size)]}>
                <Text style={styles.sizeText}>{size}</Text>
            </View>
        );
    };

    const renderCoffeeItem = ({ item }: { item: CoffeeItem }) => (
        <TouchableOpacity key={item.id} style={styles.coffeeCard} onPress={() => handleCoffeePress(item)}>
            <View style={styles.coffeeCardContent}>
                <View style={styles.coffeeInfo}>
                    <Text style={styles.coffeeName}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.coffeeDescription}>{item.description}</Text>
                    <View style={styles.sizesContainer}>
                        {item.prices.map((price, index) => renderSize(Object.keys(price)[0], index))}
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>£{Object.values(item.prices[0])[0].toFixed(2)}</Text>
                    <Text style={styles.priceLabel}>From</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const ListHeaderComponent = useMemo(() => (
        <View style={styles.orderSection}>
            <View style={styles.headerRow}>
                <View style={styles.headerText}>
                    <Text style={styles.sectionTitle}>New Order</Text>
                    <Text style={styles.sectionSubtitle}>
                        Select drinks and customize your order
                    </Text>
                </View>
                {orderItems.length > 0 && (
                    <TouchableOpacity 
                        style={styles.orderSummaryButton} 
                        onPress={handleShowOrderSummary}
                    >
                        <Text style={styles.orderSummaryButtonText}>
                            Cart ({orderItems.length})
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    ), [orderItems.length])

    return (
        <>
            <FlatList
                ListHeaderComponent={ListHeaderComponent}
                showsVerticalScrollIndicator={false}
                style={styles.listStyle}
                data={coffeeItems}
                renderItem={renderCoffeeItem}
            />
            <CoffeeSizeModal
                visible={modalVisible}
                coffeeItem={selectedCoffee}
                onClose={handleModalClose}
                onSelectSize={handleSizeSelect}
            />
            <OrderSummary
                visible={orderSummaryVisible}
                orderItems={orderItems}
                onClose={handleOrderSummaryClose}
                onEditItem={handleEditItem}
                onRemoveItem={handleRemoveItem}
                onSubmitOrder={handleSubmitOrder}
            />
        </>
    )
}

const styles = StyleSheet.create({
    listStyle: {
        flex: 1,
        backgroundColor: 'white',
        padding: s(20),
        overflow: 'hidden',
    },
    orderSection: {
        padding: s(20),
        backgroundColor: 'white',
        zIndex: 2
    },
    sectionTitle: {
        fontSize: s(28),
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: s(16),
        color: '#666',
    },
    coffeeCard: {
        marginBottom: s(16),
        backgroundColor: 'white',
        borderRadius: s(12),
        padding: s(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    coffeeCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    coffeeInfo: {
        flex: 1,
        marginRight: s(16),
    },
    coffeeName: {
        fontSize: s(20),
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    coffeeDescription: {
        fontSize: s(12),
        color: '#666',
        marginBottom: s(12),
        lineHeight: s(20),
    },
    sizesContainer: {
        flexDirection: 'row',
        gap: s(8),
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden'
    },
    size: {
        paddingHorizontal: s(12),
        paddingVertical: s(6),
        borderRadius: s(16),
    },
    sizeText: {
        fontSize: s(12),
        fontWeight: '500',
    },
    sizeLarge: {
        backgroundColor: '#E8F5E8', // Light green for small
    },
    sizeMedium: {
        backgroundColor: '#FFF8DC', // Light yellow for medium
    },
    sizeSmall: {
        backgroundColor: '#FFE6F0', // Light pink for large
    },
    sizeDefault: {
        backgroundColor: '#F0F0F0',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: s(20),
        fontWeight: '700',
        color: '#C17D3A',
        marginBottom: s(4),
    },
    priceLabel: {
        fontSize: s(12),
        color: '#999',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerText: {
        flex: 1,
    },
    orderSummaryButton: {
        backgroundColor: '#8B4513',
        paddingHorizontal: s(16),
        paddingVertical: s(8),
        borderRadius: s(20),
        marginLeft: s(16),
    },
    orderSummaryButtonText: {
        color: 'white',
        fontSize: s(14),
        fontWeight: '600',
    },
})