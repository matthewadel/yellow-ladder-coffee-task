import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Alert } from 'react-native';
import { s } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { CoffeeSizeModal } from './CoffeeSizeModal';
import { Drink, OrderDrink } from '@yellow-ladder-coffee/types';
import { SCREENS } from '../../navigation/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDrinks } from '../../store/drinksSlice';

export const CoffeeList = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const { drinks, loading, error } = useAppSelector((state) => state.drinks);
    
    const [selectedCoffee, setSelectedCoffee] = useState<Drink | null>(null);
    const [updatedCoffee, setUpdatedCoffee] = useState<Drink | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [orderItems, setOrderItems] = useState<OrderDrink[]>([]);

    // Fetch drinks when component mounts
    useEffect(() => {
        dispatch(fetchDrinks());
    }, [dispatch]);

    // Handle pull-to-refresh
    const handleRefresh = useCallback(() => {
        dispatch(fetchDrinks());
    }, [dispatch]);

    // Show error alert if there's an error fetching drinks
    useEffect(() => {
        if (error) {
            Alert.alert(
                'Error Loading Drinks', 
                error, 
                [
                    { text: 'Retry', onPress: () => dispatch(fetchDrinks()) },
                    { text: 'OK', style: 'cancel' }
                ]
            );
        }
    }, [error, dispatch]);

    const handleCoffeePress = (coffee: Drink) => {
        setSelectedCoffee(coffee);
        setModalVisible(true);
    };

    const handleSizeSelect = (orderItem: OrderDrink) => {
        if (selectedCoffee)
            setOrderItems(prev => [...prev, orderItem]);
        else if (updatedCoffee) {
            setOrderItems(prev => prev.map(order => order.id === updatedCoffee.id ? orderItem : order));
        }
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedCoffee(null);
    };

    const handleRemoveItem = useCallback((itemId: string) => {
        setOrderItems(prev => prev.filter(item => item.id !== itemId));
    }, []);

    const handleSubmitOrder = useCallback(() => {
        setOrderItems([]);
    }, []);

    const handleEditItem = useCallback((item: OrderDrink) => {
        const coffeeItem = drinks.find(coffee => coffee.name === item.name);
        if (coffeeItem) {
            setUpdatedCoffee({ ...coffeeItem, id: item.id });
            setModalVisible(true);
        }
    }, [drinks]);

    const handleShowOrderSummary = useCallback(() => {
        navigation.navigate(SCREENS.ORDER_SUMMARY, {
            orderItems,
            onEditItem: handleEditItem,
            onRemoveItem: handleRemoveItem,
            onSubmitOrder: handleSubmitOrder,
        });
    }, [navigation, orderItems, handleEditItem, handleRemoveItem, handleSubmitOrder]);

    useEffect(() => {

        if (updatedCoffee && !modalVisible) {
            setUpdatedCoffee(null);
            handleShowOrderSummary()
        }
    }, [updatedCoffee, modalVisible, handleShowOrderSummary])

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

    const renderCoffeeItem = ({ item }: { item: Drink }) => {
        const minPrice = Math.min(...item.prices.map((priceObj) => priceObj.price));

        return (
            <TouchableOpacity key={item.id} style={styles.coffeeCard} onPress={() => handleCoffeePress(item)}>
                <View style={styles.coffeeCardContent}>
                    <View style={styles.coffeeInfo}>
                        <Text style={styles.coffeeName}>{item.name}</Text>
                        <Text numberOfLines={1} style={styles.coffeeDescription}>{item.description}</Text>
                        <View style={styles.sizesContainer}>
                            {item.prices.map((priceObj, index: number) => renderSize(priceObj.size, index))}
                        </View>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>£{minPrice.toFixed(2)}</Text>
                        <Text style={styles.priceLabel}>From</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

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
    ), [orderItems.length, handleShowOrderSummary]);

    const ListEmptyComponent = useMemo(() => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No drinks available</Text>
            <Text style={styles.emptyStateSubtitle}>
                {loading ? 'Loading drinks...' : 'Pull down to refresh'}
            </Text>
        </View>
    ), [loading]);

    return (
        <>
            <FlatList
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
                style={styles.listStyle}
                data={drinks}
                renderItem={renderCoffeeItem}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        tintColor="#8B4513"
                        title="Pull to refresh drinks..."
                    />
                }
            />
            <CoffeeSizeModal
                visible={modalVisible}
                coffeeItem={selectedCoffee || updatedCoffee}
                onClose={handleModalClose}
                onSelectSize={handleSizeSelect}
                updateItem={!!updatedCoffee}
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
    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: s(60),
        paddingHorizontal: s(20),
    },
    emptyStateTitle: {
        fontSize: s(18),
        fontWeight: '600',
        color: '#333',
        marginBottom: s(8),
        textAlign: 'center',
    },
    emptyStateSubtitle: {
        fontSize: s(14),
        color: '#666',
        textAlign: 'center',
    },
})