import React from 'react';
import { useRouteDetailScreen } from './useRouteDetailScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RouteDetailScreen = () => {
    const { snapRoutes, isLoading } = useRouteDetailScreen();

    return <SafeAreaView></SafeAreaView>;
};
