import React, { useRef } from 'react';
import { Image, PanResponder } from 'react-native';
import { Animated, Dimensions, SafeAreaView, View } from 'react-native';

export const HomeScreen = () => {

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const pictures = [
        { id: 1, uri: ('https://picsum.photos/200/300') },
        { id: 2, uri: ('https://picsum.photos/200/300') },
        { id: 3, uri: ('https://picsum.photos/200/300') },
        { id: 4, uri: ('https://picsum.photos/200/300') },
        { id: 5, uri: ('https://picsum.photos/200/300') },
        { id: 6, uri: ('https://picsum.photos/200/300') },
    ];

    const position = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            // onPanResponderRelease: (e, gestureState) => {
            // },
        })
    ).current;


    const RenderPictures = () => {
        return pictures.map((picture, i) => (
            <Animated.View
                {...panResponder.panHandlers}
                key={picture.id}
                style={[
                    {
                        ...position.getLayout(),
                    }
                    , {
                        height: SCREEN_HEIGHT * 0.79,
                        width: SCREEN_WIDTH,
                        padding: 10,
                        position: 'absolute',
                    }]}
            >
                <Image
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        borderRadius: 20,
                    }}
                    source={{ uri: pictures[0].uri }}
                />

            </Animated.View>
        ));
    };


    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>
                {RenderPictures()}
            </View>
        </SafeAreaView >
    );
};
