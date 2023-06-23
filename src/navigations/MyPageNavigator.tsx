import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MyPageScreen } from '../screens/MyPageScreen';
import { MyPageDetailScreen } from '../screens/MyPageDetailScreen';

const myPageStack = createStackNavigator();

export const MyPageNavigator = () => {
    return (
        <myPageStack.Navigator
            initialRouteName={'MyPageProfile'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <myPageStack.Screen
                name={'MyPageProfile'}
                component={MyPageScreen}
            />
            <myPageStack.Screen
                name={'MyPageDetail'}
                component={MyPageDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
        </myPageStack.Navigator>
    );
};
