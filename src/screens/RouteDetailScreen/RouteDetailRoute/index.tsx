import { Text, View } from 'react-native';
import React from 'react';
import { useRouteDetailRouteScreen } from './useRouteDetailRouteScreen';

export const RouteDetailRouteScreen = () => {
    useRouteDetailRouteScreen();
    return (
        <View>
            <Text>RouteDetailRoute</Text>
        </View>
    );
};
