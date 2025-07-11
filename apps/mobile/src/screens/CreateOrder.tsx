import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CoffeeItem {
    id: string;
    name: string;
    description: string;
    price: number;
    tags: string[];
}


export const CreateOrder = () => {

    const coffeeItems: CoffeeItem[] = [
        {
            id: '1',
            name: 'Espresso',
            description: 'Rich, bold shot of pure coffee',
            price: 2.2,
            tags: ['Strong', 'Classic'],
        },
        {
            id: '2',
            name: 'Latte',
            description: 'Smooth espresso with steamed milk',
            price: 3.5,
            tags: ['Creamy', 'Popular'],
        },
        {
            id: '3',
            name: 'Iced Americano',
            description: 'Espresso shots over ice with cold water',
            price: 3.2,
            tags: ['Iced', 'Refreshing'],
        },
    ];

    const renderTag = (tag: string, index: number) => {
        const getTagStyle = (tagName: string) => {
            switch (tagName.toLowerCase()) {
                case 'strong':
                    return styles.tagStrong;
                case 'classic':
                    return styles.tagClassic;
                case 'creamy':
                    return styles.tagCreamy;
                case 'popular':
                    return styles.tagPopular;
                case 'iced':
                    return styles.tagIced;
                case 'refreshing':
                    return styles.tagRefreshing;
                default:
                    return styles.tagDefault;
            }
        };

        return (
            <View key={index} style={[styles.tag, getTagStyle(tag)]}>
                <Text style={styles.tagText}>{tag}</Text>
            </View>
        );
    };

    const renderCoffeeItem = (item: CoffeeItem) => (
        <TouchableOpacity key={item.id} style={styles.coffeeCard}>
            <View style={styles.coffeeCardContent}>
                <View style={styles.coffeeInfo}>
                    <Text style={styles.coffeeName}>{item.name}</Text>
                    <Text style={styles.coffeeDescription}>{item.description}</Text>
                    <View style={styles.tagsContainer}>
                        {item.tags.map((tag, index) => renderTag(tag, index))}
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>£{item.price.toFixed(2)}</Text>
                    <Text style={styles.priceLabel}>From</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

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
                <ScrollView style={styles.content}>
                    <View style={styles.orderSection}>
                        <Text style={styles.sectionTitle}>New Order</Text>
                        <Text style={styles.sectionSubtitle}>
                            Select drinks and customize your order
                        </Text>
                    </View>

                    <View style={styles.menuSection}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuIcon}>☕</Text>
                            <Text style={styles.menuTitle}>Coffee Menu</Text>
                        </View>

                        <View style={styles.menuItems}>{coffeeItems.map(renderCoffeeItem)}</View>
                    </View>
                </ScrollView>
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
        // backgroundColor: 'white',
    },
    bottomSafeArea: {
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    orderSection: {
        padding: 20,
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    menuSection: {
        padding: 20,
    },
    menuHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    menuIcon: {
        fontSize: 20,
        marginRight: 10,
        color: '#8B4513',
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    menuItems: {
        gap: 16,
    },
    coffeeCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
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
        marginRight: 16,
    },
    coffeeName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    coffeeDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
    },
    tagStrong: {
        backgroundColor: '#FFF8DC',
    },
    tagClassic: {
        backgroundColor: '#F5F5DC',
    },
    tagCreamy: {
        backgroundColor: '#E6F3FF',
    },
    tagPopular: {
        backgroundColor: '#FFE6F0',
    },
    tagIced: {
        backgroundColor: '#E0F7FA',
    },
    tagRefreshing: {
        backgroundColor: '#E8F5E8',
    },
    tagDefault: {
        backgroundColor: '#F0F0F0',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        color: '#C17D3A',
        marginBottom: 4,
    },
    priceLabel: {
        fontSize: 12,
        color: '#999',
    },
});
