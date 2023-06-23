import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouteListScreen } from './useRouteListScreen';
import { ScreenLoader } from '../../components/common/ScreenLoader';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { RouteCard } from '../../components/elements/SnapRouteCard';

export const RouteListScreen = () => {
    const { snapRoutes, isLoading, handlePressRoute } = useRouteListScreen();

    if (isLoading) return <ScreenLoader />;

    return (
        <ScrollView>
            {snapRoutes.map((snapRoute) => {
                return (
                    <View key={snapRoute.snapRouteId} style={{ margin: 10 }}>
                        <RouteCard
                            title={snapRoute.title}
                            imagePath={
                                snapRoute.snapPosts[0].postImages[0].imagePath
                            }
                            onPress={() =>
                                handlePressRoute(snapRoute.snapRouteId)
                            }
                        />
                    </View>
                );
            })}
        </ScrollView>
    );
};
