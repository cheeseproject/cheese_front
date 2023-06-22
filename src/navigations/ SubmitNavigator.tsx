import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { PAGE_NAVIGATION } from '../constants/pageNavigation';

const authStack = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <authStack.Navigator
            initialRouteName={PAGE_NAVIGATION.SIGN_IN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <authStack.Screen name={'SignIn'} component={SignInScreen} />
            <authStack.Screen
                name={'SignUp'}
                component={SignUpScreen}
                options={{
                    presentation: 'modal',
                    headerShown: true,
                }}
            />
        </authStack.Navigator>
    );
};
