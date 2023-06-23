import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { PAGE_NAVIGATION } from '../constants/pageNavigation';
import { SubmitScreen } from '../screens/SubmitScreen';
import { SubmitMapScreen } from '../screens/SubmitScreen/SubmitMapScreen';

const submitStack = createStackNavigator();

export const SubmitNavigator = () => {
    return (
        <submitStack.Navigator
            initialRouteName={'SubmitMain'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <submitStack.Screen name={'SubmitMain'} component={SubmitScreen} />
            <submitStack.Screen
                name={'SubmitMap'}
                component={SubmitMapScreen}
                options={{
                    // presentation: 'modal',
                    headerShown: false,
                }}
            />
        </submitStack.Navigator>
    );
};
