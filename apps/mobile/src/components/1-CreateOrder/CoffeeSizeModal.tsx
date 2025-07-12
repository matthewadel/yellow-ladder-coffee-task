import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { s } from 'react-native-size-matters';
import { cupSmall, cupMedium, cupLarge } from '../../assets';
import type { Drink, OrderDrink } from '@yellow-ladder-coffee/shared-types';

interface CoffeeSizeModalProps {
    visible: boolean;
    updateItem: boolean;
    coffeeItem: Drink | null;
    onClose: () => void;
    onSelectSize: (orderItem: OrderDrink) => void;
}

const { width } = Dimensions.get('window');

export const CoffeeSizeModal: React.FC<CoffeeSizeModalProps> = ({
    visible,
    coffeeItem,
    updateItem,
    onClose,
    onSelectSize,
}) => {
    if (!coffeeItem) return null;

    const handleSizeSelect = (size: string, price: number) => {
        const orderItem: OrderDrink = {
            id: updateItem ? coffeeItem.id : `${coffeeItem.id}-${size}-${Date.now()}`,
            name: coffeeItem.name,
            size,
            price,
        };
        onSelectSize(orderItem);
        onClose();
    };

    const getSizeIcon = (size: string) => {
        const getImageSource = () => {
            switch (size.toLowerCase()) {
                case 'small':
                    return cupSmall;
                case 'medium':
                    return cupMedium;
                case 'large':
                    return cupLarge;
                default:
                    return cupMedium;
            }
        };

        return (
            <Image
                source={getImageSource()}
                style={styles.imageSize}
                resizeMode="contain"
            />
        );
    };

    const getSizeDescription = (size: string) => {
        switch (size.toLowerCase()) {
            case 'small':
                return '8oz • Perfect for a quick boost';
            case 'medium':
                return '12oz • Most popular choice';
            case 'large':
                return '12oz • Most popular choice';
            default:
                return 'special size';
        }
    };

    const renderSizeOption = (priceObj: Record<string, number>, index: number) => {
        const size = Object.keys(priceObj)[0];
        const price = Object.values(priceObj)[0];

        return (
            <TouchableOpacity
                key={index}
                style={styles.sizeOption}
                onPress={() => handleSizeSelect(size, price)}
            >
                <View style={styles.sizeContent}>
                    <View style={styles.sizeInfo}>
                        <View style={styles.sizeIconContainer}>{getSizeIcon(size)}</View>
                        <View style={styles.sizeDetails}>
                            <Text style={styles.sizeName}>
                                {size}
                            </Text>
                            <Text numberOfLines={1} style={styles.sizeDescription}>
                                {getSizeDescription(size)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.priceInfo}>
                        <Text style={styles.sizePrice}>£{price.toFixed(2)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.coffeeIcon}>☕</Text>
                                <Text style={styles.modalTitle}>{coffeeItem.name}</Text>
                                <Text style={styles.modalSubtitle}>
                                    Select your preferred size
                                </Text>

                                <View style={styles.sizesContainer}>
                                    {coffeeItem.prices.map((priceObj, index) =>
                                        renderSizeOption(priceObj, index)
                                    )}
                                </View>

                                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.9,
        maxWidth: 400,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: s(20),
        padding: s(24),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
    coffeeIcon: {
        fontSize: s(48),
        marginBottom: s(16),
    },
    modalTitle: {
        fontSize: s(24),
        fontWeight: '700',
        color: '#333',
        marginBottom: s(8),
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: s(16),
        color: '#666',
        marginBottom: s(24),
        textAlign: 'center',
    },
    sizesContainer: {
        width: '100%',
        gap: s(12),
        marginBottom: s(24),
    },
    sizeOption: {
        backgroundColor: '#F8F9FA',
        borderRadius: s(12),
        padding: s(16),
        borderWidth: 1,
        borderColor: '#C17D3A',
    },
    sizeContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sizeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sizeIconContainer: {
        marginRight: s(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizeDetails: {
        flex: 1,
        overflow: 'hidden',
    },
    sizeName: {
        fontSize: s(18),
        fontWeight: '600',
        color: '#333',
        marginBottom: s(2),
    },
    sizeDescription: {
        fontSize: s(10),
        color: '#6B7280',
        width: '95%',
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    sizePrice: {
        fontSize: s(18),
        fontWeight: '700',
        color: '#C17D3A',
        marginBottom: s(2),
    },
    extraCost: {
        fontSize: s(12),
        color: '#FF6B6B',
        fontWeight: '500',
    },
    basePrice: {
        fontSize: s(12),
        color: '#28A745',
        fontWeight: '500',
    },
    cancelButton: {
        paddingVertical: s(12),
        paddingHorizontal: s(24),
    },
    cancelText: {
        fontSize: s(16),
        color: '#666',
        fontWeight: '500',
    },
    imageSize: {
        width: s(50), height: s(50)
    }
});
