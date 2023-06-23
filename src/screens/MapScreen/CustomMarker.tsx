import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

type Props = {
    snapPost: any;
};

export const CustomMarker = ({snapPost}:Props) => {
    return (
        <Marker
            coordinate={{
                latitude:snapPost.latitude,   
                longitude: snapPost.longitude,
            }}
            onPress={() => {
                // addSnapPostIdToRoute(snapPost.id);
                // handleSubmitSnapRoute();
            }}
        >
            <Image
                source={require('../../assets/mapicon.png')}
            />
            <Image
                source={{ uri: snapPost.snapPostImage }}
                style={{ width: 96, height: 96,position:'absolute',top:7,left:7,borderRadius:96/2 }}
            />
        </Marker>  
    );
};
