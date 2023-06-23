import React from 'react';
import { RouteDetailMapScreen } from '../screens/RouteDetailScreen/RouteDetailMap';
import { RouteDetailRouteScreen } from '../screens/RouteDetailScreen/RouteDetailRoute';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export const RouteDetailTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="RouteDetailMap"
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },

                tabBarIndicatorStyle: {
                    backgroundColor: '#000',
                    height: 2,
                },
            }}
        >
            <Tab.Screen
                name="RouteDetailMap"
                component={RouteDetailMapScreen}
                options={{ title: '地図' }}
            />
            <Tab.Screen
                name="RouteDetailRoute"
                component={RouteDetailRouteScreen}
                options={{ title: 'ルート' }}
            />
        </Tab.Navigator>
    );
};
