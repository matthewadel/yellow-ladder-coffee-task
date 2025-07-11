import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { s } from 'react-native-size-matters';

interface OrderItem {
    id: string;
    name: string;
    size: string;
    price: number;
}

interface OrderSummaryProps {
    visible: boolean;
    orderItems: OrderItem[];
    onClose: () => void;
    onEditItem: (item: OrderItem) => void;
    onRemoveItem: (itemId: string) => void;
    onSubmitOrder: () => void;
}

const ItemSeparator = () => <View style={styles.separator} />;

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    visible,
    orderItems,
    onClose,
    onEditItem,
    onRemoveItem,
    onSubmitOrder,
}) => {
    const calculateTotal = () => {
        return orderItems.reduce((total, item) => total + item.price, 0);
    };

    const renderOrderItem = ({ item }: { item: OrderItem }) => {
        console.log(item);
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
                            onPress={() => onEditItem(item)}
                        >
                            <Text style={styles.editButtonText}>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => onRemoveItem(item.id)}
                        >
                            <Text style={styles.removeButtonText}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Order Summary</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
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
                onPress={onSubmitOrder}
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
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    {renderHeader()}
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyStateIcon}>☕</Text>
                                        <Text style={styles.emptyStateTitle}>No items in your order</Text>
                                        <Text style={styles.emptyStateSubtitle}>
                                            Add some delicious coffee to get started!
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {renderHeader()}
                                <FlatList
                                    data={orderItems}
                                    renderItem={renderOrderItem}
                                    keyExtractor={(item) => item.id}
                                    style={styles.orderList}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={ItemSeparator}
                                />
                                {renderFooter()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        width: '100%',
        maxHeight: '80%',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),
        paddingHorizontal: s(20),
        paddingBottom: s(20),
        maxHeight: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: s(20),
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
        marginBottom: s(16),
    },
    headerTitle: {
        fontSize: s(24),
        fontWeight: '700',
        color: '#333',
    },
    closeButton: {
        width: s(32),
        height: s(32),
        borderRadius: s(16),
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: s(18),
        color: '#666',
        fontWeight: '500',
    },
    orderList: {
        flex: 1,
        marginBottom: s(16),
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
});
