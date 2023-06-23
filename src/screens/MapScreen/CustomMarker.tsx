import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { SnapPost } from '../../entities/SnapPost';

type Props = {
    snapPost: SnapPost;
    onClick: () => void;
};

export const CustomMarker = ({ snapPost, onClick }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        onClick();
    };

    // console.log(snapPost.latitude);

    return (
        <Marker
            coordinate={{
                latitude: snapPost.latitude,
                longitude: snapPost.longitude,
            }}
            onPress={handleClick}
        >
            <Image source={require('../../assets/mapicon.png')} />
            <Image
                source={{ uri: snapPost.postImages[0].imagePath }}
                style={{
                    width: 96,
                    height: 96,
                    position: 'absolute',
                    top: 7,
                    left: 7,
                    borderRadius: 96 / 2,
                }}
            />
            {isSelected && (
                <View
                    style={{
                        width: 96,
                        height: 96,
                        position: 'absolute',
                        top: 7,
                        left: 7,
                        borderRadius: 96 / 2,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                    }}
                >
                    <FontAwesome
                        name="check-circle"
                        size={30}
                        color="#0A85FF"
                        style={{
                            zIndex: 100,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                    />
                </View>
            )}
        </Marker>
    );
};
