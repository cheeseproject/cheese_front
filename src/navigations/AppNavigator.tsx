import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainStackNavigator } from './MainStackNavigator';
import { AuthNavigator } from './AuthNavigator';
import { useAuthUser } from '../state/authUser';
import { useFetchUser } from '../hooks/domain/user/useFetchUser';
import { ScreenLoader } from '../components/common/ScreenLoader';

export const AppNavigator = () => {
    const { authUser } = useAuthUser();
    // NOTE: 認証された時にプロフィールがフェッチされる
    const { data: userProfile, isLoading } = useFetchUser(authUser?.uid, {
        enabled: !!authUser,
    });

    const Navigation = () => {
        if (authUser === undefined) return <ScreenLoader />;
        if (authUser === null) return <AuthNavigator />;
        if (isLoading) return <ScreenLoader />;
        if (!userProfile)
            return <MainStackNavigator initialRouteName="NewProfile" />;
        return <MainStackNavigator />;
    };

    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
};
