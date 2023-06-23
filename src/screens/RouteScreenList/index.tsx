import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouteListScreen } from './useRouteListScreen';

export const RouteListScreen = () => {
    const { snapRoutes, isLoading } = useRouteListScreen();

    return <SafeAreaView></SafeAreaView>;
};
