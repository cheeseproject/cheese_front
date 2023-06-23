import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from './Header';
import { Appbar, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import { useLocationInformation } from '../../hooks/useLocationInformation';

type Props = {
    navigation: StackNavigationProp<any>;
};

export const SubmitMapScreen = ({ navigation }: Props) => {
    const { location } = useLocationInformation();

    const [markerCoords, setMarkerCoords] = useState(null);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoords(coordinate);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };
    console.log(location);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={handleGoBack} />
                <Appbar.Content
                    title="スポットを選択して、ピンを立ててください。"
                    titleStyle={{ fontSize: 12 }}
                />
            </Appbar.Header>
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
                        onPress={handleMapPress}
                    >
                        {markerCoords && <Marker coordinate={markerCoords} />}
                    </MapView>
                ) : (
                    <Text>現在位置を取得できませんでした</Text>
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mapview: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    selectedBtn: {
        position: 'absolute',
        top: 80,
        left: 0,
        zIndex: 100,
        width: 240,
        padding: 4,
    },
});
