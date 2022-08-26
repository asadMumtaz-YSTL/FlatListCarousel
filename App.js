import React, { useRef, useCallback, } from 'react';
// import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image,
    Animated,
} from 'react-native';
// carousel

const { width, height } = Dimensions.get('window')
const ITEM_WIDTH = width
const ITEM_HEIGHT = height * 0.7
const DOT_SIZE = 8
const DOT_SPACING = 8
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING

const App = () => {
    const ScrollY = React.useRef(new Animated.Value(0)).current

    const images = [
        'https://m.media-amazon.com/images/I/51sAvIwoIVL._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/41Aw4HfMwES._AC_SL1001_.jpg',
        'https://m.media-amazon.com/images/I/61p4D-YB+WS._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/51vdYc0MnBS._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/71zPNjHL8lS._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/51E8dChTwIS._AC_SL1000_.jpg',
        'https://m.media-amazon.com/images/I/61LCy5Umc8S._AC_SL1000_.jpg',
    ];
    const productDetail = {
        title: 'OTTERBOX COMMUTER SERIES Case for iPhone 12 & 13 Serise',
        price: '$39.95',
        style: 'COMMUTER SERIES',
        color: 'Black',
        about: `Compatible with iPhone 12 & iPhone 12 Pro
    Lasting antimicrobial technology helps protect case exterior against many common bacteria Helps protect the case exterior against many common bacteria. It does not protect you or the screen.
    One-piece design pops on and off in a flash
    Thin profile slips in and out of pockets with soft inner and hard outer layers absorb and deflect impacts, open access to ports and speakers
    Includes OtterBox limited lifetime warranty (see website for details)`,
        note: 'Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.',
        modal: 'IPhone 12 & iPhone 12 Pro & IPhone 13 & iPhone 13 Pro',
        description: [
            // about: 'About this item'
        ],

    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} hidden />

            <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
                <Animated.FlatList
                    data={images}
                    keyExtractor={(_, index) => index.toString()}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate='fast'
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: ScrollY } } }],
                        { useNativeDriver: true }
                    )}
                    renderItem={(item) => {
                        return (
                            <View>
                                <Image source={{ uri: item.item }} style={styles.image} resizeMode='contain' />
                            </View>
                        )
                    }}
                />

                <View style={styles.pagination}>
                    {images.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={[styles.dot]}
                            />
                        )
                    })}
                    <Animated.View
                        style={[styles.dotIndicator, {
                            transform: [{
                                translateY: Animated.divide(ScrollY, ITEM_HEIGHT).interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, DOT_INDICATOR_SIZE]
                                })
                            }]
                        }]}
                    />
                </View>
            </View>

            {/* <BottomSheet
                initialSnapIndex={0}
                snapPoints={[height - ITEM_HEIGHT, height / 2]}
            >
                <BottomSheetScrollView>
                    <Text>{productDetail.title}</Text>
                    <Text>{productDetail.price}</Text>
                </BottomSheetScrollView>
            </BottomSheet> */}

        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    pagination: {
        position: 'absolute',
        top: ITEM_HEIGHT / 2 - 60,
        left: 10,
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE,
        backgroundColor: '#333',
        marginBottom: DOT_SPACING
    },
    dotIndicator: {
        width: DOT_INDICATOR_SIZE,
        height: DOT_INDICATOR_SIZE,
        borderRadius: DOT_INDICATOR_SIZE,
        borderColor: '#333',
        borderWidth: 1,
        position: 'absolute',
        top: -DOT_SIZE / 2,
        left: -DOT_SIZE / 2
    },
});

export default App;
