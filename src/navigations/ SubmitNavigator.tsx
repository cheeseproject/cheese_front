import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { PAGE_NAVIGATION } from '../constants/pageNavigation';

const submitStack = createStackNavigator();

export const SubmitNavigator = () => {
    return (
        <submitStack.Navigator
            initialRouteName={'SubmitMain'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <submitStack.Screen name={'SubmitMain'} component={SignInScreen} />
            <submitStack.Screen
                name={'SubmitMap'}
                component={SignUpScreen}
                options={{
                    presentation: 'modal',
                    headerShown: true,
                }}
            />
        </submitStack.Navigator>
    );
};
