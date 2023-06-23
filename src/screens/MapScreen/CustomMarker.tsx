import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';

type Props = {
    snapPost: any;
    onClick:()=>void
};

export const CustomMarker = ({snapPost,onClick}:Props) => {

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        onClick();
    };

    return (
        <Marker
            coordinate={{
                latitude:snapPost.latitude,   
                longitude: snapPost.longitude,
            }}
            onPress={handleClick}
        >
            <Image
                source={require('../../assets/mapicon.png')}
            />
            <Image
                source={{ uri: snapPost.snapPostImage }}
                style={{ width: 96, height: 96,position:'absolute',top:7,left:7,borderRadius:96/2, }}
            />
            {isSelected && (
                <View 
                    style={{ width: 96, height: 96,position:'absolute',top:7,left:7,borderRadius:96/2, backgroundColor:'rgba(255,255,255,0.5)'}}
                >
                    
                </View>
            )
            }
        </Marker>  
    );
};
