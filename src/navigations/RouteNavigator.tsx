import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RouteListScreen } from '../screens/RouteScreenList';
import { RouteDetailScreen } from '../screens/RouteDetailScreen';
import { RouteDetailTabNavigator } from './RouteDetailTabNavigator';

const RouteStack = createStackNavigator();

export const RouteNavigator = () => {
    return (
        <RouteStack.Navigator
            initialRouteName={'RouteList'}
            screenOptions={{
                headerShown: true,
            }}
        >
            <RouteStack.Screen
                name={'RouteList'}
                component={RouteListScreen}
                options={{
                    title: 'ルート一覧',
                }}
            />
            <RouteStack.Screen
                name={'RouteDetail'}
                component={RouteDetailTabNavigator}
                options={{
                    headerShown: true,
                    title: '',
                }}
            />
        </RouteStack.Navigator>
    );
};
