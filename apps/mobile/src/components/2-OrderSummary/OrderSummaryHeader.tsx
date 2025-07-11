import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { s } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

interface OrderSummaryHeaderProps {
    onBackPress: () => void;
}

export const OrderSummaryHeader: React.FC<OrderSummaryHeaderProps> = ({
    onBackPress,
}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={onBackPress}
            >
                <Icon name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Order Summary</Text>
            <View style={styles.placeholder} />
        </View>
    );
};

const styles = StyleSheet.create({
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
});
