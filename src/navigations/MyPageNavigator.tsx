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
                headerShown: true,
            }}
        >
            <myPageStack.Screen
                name={'MyPageProfile'}
                component={MyPageScreen}
                options={{
                    title: 'マイページ',
                }}
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
