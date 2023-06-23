import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SegmentedButtons, Text } from 'react-native-paper';

import { useMapScreen } from './useMapScreen';

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
                        <Marker coordinate={location} />
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
