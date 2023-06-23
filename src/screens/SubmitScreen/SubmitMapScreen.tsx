import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
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

    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <SafeAreaView>
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
                    >
                        <Marker coordinate={location} />
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
