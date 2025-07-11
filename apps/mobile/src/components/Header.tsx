import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { cup } from '../assets'
import { s } from 'react-native-size-matters';
import { useNetworkContext } from '../context/NetworkContext';

const Header = () => {
    const { isInternetReachable } = useNetworkContext();

    const getStatusColor = () => {
        if (isInternetReachable === null) return '#FFA500'; // Orange for loading
        return isInternetReachable ? '#4CAF50' : '#F44336'; // Green for online, Red for offline
    };

    const getStatusText = () => {
        if (isInternetReachable === null) return 'Checking...';
        return isInternetReachable ? 'Online' : 'Offline';
    };

    return (
        <View style={styles.header}>
            <View style={styles.statusContainer}>
                <View style={[styles.onlineIndicator, { backgroundColor: getStatusColor() }]} />
                <Text style={styles.onlineText}>{getStatusText()}</Text>
            </View>
            <Text style={styles.headerTitle}>Yellow Ladder</Text>
            <Image source={cup} style={styles.imageStyle} />
        </View>
    )
}

export { Header }

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        paddingHorizontal: s(20),
        paddingVertical: s(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineIndicator: {
        width: s(8),
        height: s(8),
        borderRadius: s(4),
        marginRight: s(8),
    },
    onlineText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        position: 'absolute',
        left: 0, right: 0, textAlign: 'center'
    },
    imageStyle: {
        width: s(25),
        height: s(25),
    },
})