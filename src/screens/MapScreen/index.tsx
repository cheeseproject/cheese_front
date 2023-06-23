import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SegmentedButtons, Text } from 'react-native-paper';

import { useMapScreen } from './useMapScreen';
import { SnapPost } from '../../entities/SnapPost';


const dummySnapPosts:any[] = [
    {
        snapPostId: '1',
        userId: '1',
        title: 'test',
        longitude: 139.767125,
        latitude: 35.681236,
        snapPostImage: 'https://picsum.photos/200/300',
    },
    {
        snapPostId: '2',
        userId: '2',
        title: 'test',
        longitude: 139.797125,
        latitude: 36.051236,
        snapPostImage: 'https://picsum.photos/200/300',
    },
    {
        snapPostId: '3',
        userId: '3',
        title: 'test',
        longitude: 139.717125,
        latitude: 35.680236,
        snapPostImage: 'https://picsum.photos/200/300',
    },];


export const MapScreen = () => {
    const {
        location,
        title,
        snapPosts,
        likedSnapPosts,
        selectedButton,
        handleSubmitSnapRoute,
        addSnapPostIdToRoute,
        handleChangeSelectedButton,
    } = useMapScreen();

    let showMarker=null;
    if( selectedButton=='all'){
        showMarker=snapPosts;
    }else if(selectedButton=='recommend'){
        showMarker=snapPosts;
    }

    showMarker=dummySnapPosts;

    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                // 現在位置が取得できない場合はエラーを表示する
                location ? (
                    <MapView
                        style={styles.mapview}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        showsCompass={true}
                    >
                        {showMarker&&showMarker.map((snapPost) => (
                            <Marker
                                key={snapPost.snapPostId}
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
                        ))}

                    </MapView>
                ) : (
                    <Text>現在位置を取得できませんでした</Text>
                )
            }
            <SegmentedButtons
                value={selectedButton}
                onValueChange={handleChangeSelectedButton}
                buttons={[
                    { label: 'すべて', value: 'all',style: {backgroundColor: selectedButton === 'all' ? '#333' : '#fff'}  },
                    { label: 'おすすめ', value: 'recommend',style: {backgroundColor: selectedButton === 'recommend' ? '#333' : '#fff'} },
                ]}
                style={styles.selectedBtn}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mapview: {
        flex: 1,
    },
    selectedBtn: {
        position: 'absolute',
        // backgroundColor: 'white',
        top: 80,
        left: 0,
        zIndex: 100,
        width: 240,
        padding: 4,
    },
});
