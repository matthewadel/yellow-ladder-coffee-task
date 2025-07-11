import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from 'react-native';
import { s } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { OrderItem } from '../types';

const ItemSeparator = () => <View style={styles.separator} />;


export const OrderSummaryScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])

    const { orderItems: inputOrderItems, onEditItem, onRemoveItem, onSubmitOrder } = route.params;

    useEffect(() => {
        if (inputOrderItems)
            setOrderItems([...inputOrderItems])
    }, [inputOrderItems])

    const calculateTotal = () => {
        return orderItems.reduce((total: number, item: OrderItem) => total + item.price, 0);
    };

    const handleEditItem = (item: OrderItem) => {
        onEditItem(item);
        navigation.goBack();
    };

    const OnAlertAcceptPress = (itemId: string) => {
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
                    onPress: () => OnAlertAcceptPress(itemId)
                }
            ]
        );
    };


    const handleSubmitOrder = () => {
        onSubmitOrder();
        navigation.goBack();
    };

    const renderOrderItem = ({ item }: { item: OrderItem }) => {
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
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => handleEditItem(item)}
                        >
                            <Text style={styles.editButtonText}>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => handleRemoveItem(item.id)}
                        >
                            <Text style={styles.removeButtonText}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Summary</Text>
            <View style={styles.placeholder} />
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footer}>
            <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>£{calculateTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    orderItems.length === 0 && styles.submitButtonDisabled
                ]}
                onPress={handleSubmitOrder}
                disabled={orderItems.length === 0}
            >
                <Text style={[
                    styles.submitButtonText,
                    orderItems.length === 0 && styles.submitButtonTextDisabled
                ]}>
                    Submit Order
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (orderItems.length === 0) {
        return (
            <LinearGradient
                colors={['#6F4E37', '#8B4513', '#A0522D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
            >
                <SafeAreaView style={styles.container} edges={['top']}>
                    {renderHeader()}
                    <View style={styles.content}>
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateIcon}>☕</Text>
                            <Text style={styles.emptyStateTitle}>No items in your order</Text>
                            <Text style={styles.emptyStateSubtitle}>
                                Add some delicious coffee to get started!
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#6F4E37', '#8B4513', '#A0522D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.container} edges={['top']}>
                {renderHeader()}
                <View style={styles.content}>
                    <FlatList
                        data={orderItems}
                        renderItem={renderOrderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.orderList}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={ItemSeparator}
                        contentContainerStyle={styles.listContainer}
                    />
                    {renderFooter()}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: s(20),
        paddingVertical: s(16),
    },
    backButton: {
        width: s(40),
        height: s(40),
        borderRadius: s(20),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: s(24),
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    placeholder: {
        width: s(40),
    },
    orderList: {
        flex: 1,
        marginTop: s(20),
    },
    listContainer: {
        paddingBottom: s(20),
    },
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
    },
    editButton: {
        width: s(32),
        height: s(32),
        borderRadius: s(8),
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: s(16),
    },
    removeButton: {
        width: s(32),
        height: s(32),
        borderRadius: s(8),
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        fontSize: s(16),
    },
    separator: {
        height: 1,
        backgroundColor: '#E9ECEF',
        marginHorizontal: s(16),
    },
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
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: s(40),
    },
    emptyStateIcon: {
        fontSize: s(64),
        marginBottom: s(16),
    },
    emptyStateTitle: {
        fontSize: s(20),
        fontWeight: '600',
        color: '#333',
        marginBottom: s(8),
    },
    emptyStateSubtitle: {
        fontSize: s(16),
        color: '#666',
        textAlign: 'center',
    },
    bottomSafeArea: {
        backgroundColor: 'white',
    },
});
