import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { SegmentedButtons, Text } from 'react-native-paper';

import { useMapScreen } from './useMapScreen';
import { SnapPost } from '../../entities/SnapPost';
import { CustomMarker } from './CustomMarker';
import MapViewDirections from 'react-native-maps-directions';

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

    // ユーザー選択のいきたいポイント集
    const [selectedPoints, setSelectedPoints] = useState<LatLng[]>([]);
    // ルート表示用の途中ポイント集
    const [transpoints, setTranspoints] = useState<LatLng[]>([]);

    // マーカークリック時
    const handleClickMarker = (latLng: LatLng) => {
        const contained = selectedPoints.findIndex(
            (p) =>
                p.latitude === latLng.latitude &&
                p.longitude === latLng.longitude
        );
        if (contained >= 0) {
            const newPoints = [...selectedPoints];
            newPoints.splice(contained, 1);
            setSelectedPoints(newPoints);
        } else {
            // 選択されていない場合は追加する
            setSelectedPoints([...selectedPoints, latLng]);
        }
        console.log(selectedPoints);
    };

    // 道検索ボタン押すたびに道を再生成
    const handleSearch = () => {
        // const waypoints = selectedPoints.map((point) => ({ location: point }));
        setTranspoints(selectedPoints);
    };

    let showMarker: SnapPost[] = [];
    if (selectedButton == 'all') {
        showMarker = snapPosts;
    } else if (selectedButton == 'recommend') {
        showMarker = likedSnapPosts;
    }

    // console.log(showMarker.length);

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
                        {showMarker &&
                            showMarker.map((snapPost) => (
                                <CustomMarker
                                    snapPost={snapPost}
                                    key={snapPost.snapPostId}
                                    onClick={() =>
                                        handleClickMarker({
                                            latitude: snapPost.latitude,
                                            longitude: snapPost.longitude,
                                        })
                                    }
                                />
                            ))}
                        {transpoints.length > 0 && (
                            <MapViewDirections
                                origin={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                destination={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                waypoints={transpoints}
                                apikey=""
                            />
                        )}
                    </MapView>
                ) : (
                    <Text>現在位置を取得できませんでした</Text>
                )
            }
            <SegmentedButtons
                value={selectedButton}
                onValueChange={handleChangeSelectedButton}
                buttons={[
                    {
                        label: 'すべて',
                        value: 'all',
                        style: {
                            backgroundColor:
                                selectedButton === 'all' ? '#333' : '#fff',
                        },
                    },
                    {
                        label: 'おすすめ',
                        value: 'recommend',
                        style: {
                            backgroundColor:
                                selectedButton === 'recommend'
                                    ? '#333'
                                    : '#fff',
                        },
                    },
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
