import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RouteListScreen } from '../screens/RouteScreenList';
import { RouteDetailScreen } from '../screens/RouteDetailScreen';

const RouteStack = createStackNavigator();

export const RouteNavigator = () => {
    return (
        <RouteStack.Navigator
            initialRouteName={'RouteList'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <RouteStack.Screen name={'RouteList'} component={RouteListScreen} />
            <RouteStack.Screen
                name={'RouteDetail'}
                component={RouteDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </RouteStack.Navigator>
    );
};
