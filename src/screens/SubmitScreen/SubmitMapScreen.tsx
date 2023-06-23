import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from './Header';
import { Appbar, Button, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { LatLng, MapPressEvent, Marker } from 'react-native-maps';
import { useLocationInformation } from '../../hooks/useLocationInformation';

type Props = {
    navigation: StackNavigationProp<any>;
};

export const SubmitMapScreen = ({ navigation }: Props) => {
    const { location } = useLocationInformation();

    const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);

    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoords(coordinate);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleAccept = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
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
            <View style={styles.BottomBtnContainer}>
                <View style={styles.btnBtn}>
                    <Button
                        mode="outlined"
                        style={styles.Btn}
                        onPress={handleCancel}
                    >
                        キャンセル
                    </Button>
                </View>

                <View style={styles.btnBtn}>
                    <Button mode="contained" style={styles.Btn}>
                        完了
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapview: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    BottomBtnContainer: {
        borderTopColor: '#999',
        borderTopWidth: 1,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 100,
        width: '100%',
        height: 60,
        padding: 8,
        flexDirection: 'row',
    },
    btnBtn: {
        flexGrow: 1,
        width: '50%',
    },
    Btn: {
        // width: '80%',
        marginHorizontal: 8,
    },
});
