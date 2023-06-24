import React, { useEffect, useRef, useState } from 'react';
import { PanResponder, StyleSheet } from 'react-native';
import {
    Animated,
    Dimensions,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SnapPost } from '../../entities/SnapPost';
import { SwipeCard } from './SwipeCard';
import { Entypo } from '@expo/vector-icons';
import { useHomeScreen } from './useHomeScreen';
import { useSwipeSubmits } from '../../state/SwipeSubmits';

export const HomeScreen = () => {
    // 今の画像のインデックスを管理する
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedSnapPosts, setLikedSnapPosts] = useState<SnapPost[]>([]);
    const {
        addLikedSnapPost,
        handleSubmitLikedIds,
        handleRouteMap,
        snapPosts,
    } = useHomeScreen();
    const { handleSetSwipeSubmits } = useSwipeSubmits();

    const handleSetLikedSnapPosts = (snapPost: SnapPost) => {
        setLikedSnapPosts((prev) => [...prev, snapPost]);
    };

    // mapに送ります
    useEffect(() => {
        if (currentIndex !== 0 && currentIndex === snapPosts.length) {
            handleSetSwipeSubmits(likedSnapPosts);
            handleSubmitLikedIds();
            handleRouteMap();
        }
    }, [currentIndex]);

    // const { snapPosts } = useHomeScreen();

    // 右にスワイプするボタンのイベントハンドラ
    const handleSwipeRight = () => {
        // スワイプ処理を実行
        swipeCard('right');
    };

    // 左にスワイプするボタンのイベントハンドラ
    const handleSwipeLeft = () => {
        // スワイプ処理を実行
        swipeCard('left');
    };

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;

    const swipeCard = (direction: 'right' | 'left') => {
        // カードを右にスワイプする場合
        if (direction === 'right') {
            Animated.spring(position, {
                toValue: { x: SCREEN_WIDTH + 100, y: 0 },
                useNativeDriver: false,
            }).start(() => {
                setCurrentIndex((prev) => prev + 1);
                position.setValue({ x: 0, y: 0 });
            });

            // 右にスワイプしたカードの処理を実行
            handleSetLikedSnapPosts(snapPosts[currentIndex]);
            addLikedSnapPost(snapPosts[currentIndex].snapPostId);
        }
        // カードを左にスワイプする場合
        else if (direction === 'left') {
            Animated.spring(position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
                useNativeDriver: false,
            }).start(() => {
                setCurrentIndex((prev) => prev + 1);
                position.setValue({ x: 0, y: 0 });
            });
        }
    };

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
                // カードを右にスワイプしたとき
                if (gestureState.dx > 120) {
                    Animated.spring(position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: false,
                    }).start(() => {
                        setCurrentIndex((prev) => prev + 1);
                        position.setValue({ x: 0, y: 0 });
                    });
                    console.log(snapPosts);

                    addLikedSnapPost(snapPosts[currentIndex].snapPostId);
                    handleSetLikedSnapPosts(snapPosts[currentIndex]);
                }
                // カードを左にスワイプしたとき
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
        return snapPosts
            .map((snapPost, i) => {
                if (i < currentIndex) {
                    return null;
                }
                if (i === currentIndex) {
                    return (
                        <Animated.View
                            {...panResponder?.panHandlers}
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
                            <SwipeCard snapPost={snapPost} />
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
                            <SwipeCard snapPost={snapPost} />
                        </Animated.View>
                    );
                }
            })
            .reverse();
    };

    return (
        <SafeAreaView>
            <View>
                {RenderPictures()}
                <TouchableOpacity
                    style={styles.dislike}
                    onPress={handleSwipeLeft}
                >
                    <Entypo
                        name="cross"
                        size={30}
                        color="#666666"
                        style={styles.dislikeIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.like}
                    onPress={handleSwipeRight}
                >
                    <Image
                        source={require('../../assets/home/like.png')}
                        style={styles.likeIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    dislike: {
        position: 'absolute',
        top: 500,
        left: 100,
        zIndex: 1000,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 100,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 1.5,
        elevation: 2, // Android向けの影の設定
    },
    like: {
        position: 'absolute',
        top: 500,
        right: 100,
        zIndex: 1000,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 100,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 1.5,
        elevation: 2, // Android向けの影の設定
    },
    likeIcon: {
        width: 25,
        height: 25,
        objectFit: 'contain',
    },
    dislikeIcon: {
        width: 30,
        height: 30,
    },
});
