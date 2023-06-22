import React, { useRef, useState } from 'react';
import { Image, PanResponder } from 'react-native';
import { Animated, Dimensions, SafeAreaView, View } from 'react-native';
import { useHomeScreen } from './useHomeScreen';

const pictures = [
    { id: 1, uri: 'https://picsum.photos/200/300' },
    { id: 3, uri: 'https://picsum.photos/200/300' },
    { id: 4, uri: 'https://picsum.photos/200/300' },
    { id: 5, uri: 'https://picsum.photos/200/300' },
    { id: 6, uri: 'https://picsum.photos/200/300' },
];

export const HomeScreen = () => {
    // 今の画像のインデックスを管理する
    const [currentIndex, setCurrentIndex] = useState(0);

    const { snapPosts } = useHomeScreen();

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;

    // 画像のポシションを管理する
    const position = useRef(new Animated.ValueXY()).current;
    // 画像がタッチされた時のイベントを管理する
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            // カードを離したときの処理
            onPanResponderRelease: (e, gestureState) => {
                // カードを左にスワイプしたとき
                if (gestureState.dx > 120) {
                    Animated.spring(position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        setCurrentIndex((prev) => prev + 1);
                        position.setValue({ x: 0, y: 0 });
                    });
                }
                // カードを右にスワイプしたとき
                else if (gestureState.dx < -120) {
                    Animated.spring(position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        setCurrentIndex((prev) => prev + 1);
                        position.setValue({ x: 0, y: 0 });
                    });
                }
                // カードをスワイプしなかったとき
                else {
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    // 移動量に対して回転する
    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });

    // 次カードの透明度を管理する
    const nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
    });

    // 次カードのサイズを管理する
    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp',
    });

    const RenderPictures = () => {
        return pictures
            .map((picture, i) => {
                if (i < currentIndex) {
                    return null;
                }
                if (i === currentIndex) {
                    return (
                        <Animated.View
                            {...panResponder.panHandlers}
                            key={i}
                            style={[
                                {
                                    ...position.getLayout(),
                                    transform: [{ rotate: rotate }],
                                },
                                {
                                    height: SCREEN_HEIGHT - 150,
                                    width: SCREEN_WIDTH,
                                    padding: 10,
                                    position: 'absolute',
                                },
                            ]}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: 'cover',
                                    borderRadius: 20,
                                }}
                                source={{ uri: picture.uri }}
                            />
                        </Animated.View>
                    );
                } else {
                    return (
                        <Animated.View
                            key={i}
                            style={[
                                {
                                    transform: [{ scale: nextCardScale }],
                                    opacity: nextCardOpacity,
                                },
                                {
                                    height: SCREEN_HEIGHT - 150,
                                    width: SCREEN_WIDTH,
                                    padding: 10,
                                    position: 'absolute',
                                },
                            ]}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: 'cover',
                                    borderRadius: 20,
                                }}
                                source={{ uri: picture.uri }}
                            />
                        </Animated.View>
                    );
                }
            })
            .reverse();
    };

    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>{RenderPictures()}</View>
        </SafeAreaView>
    );
};
