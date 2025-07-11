import React from 'react'
import { StyleSheet, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CoffeeList, Header } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CreateOrder = () => {

    return (
        <LinearGradient
            colors={['#6F4E37', '#8B4513', '#A0522D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.container} edges={['top']}>

                {/* Header */}
                <Header />

                {/* Content */}
                <CoffeeList />

            </SafeAreaView>
            <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']} />
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    bottomSafeArea: {
        backgroundColor: 'white',
    },
});
